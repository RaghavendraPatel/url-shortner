const express = require('express');
const router = express.Router();

const md5 = require('md5');

const Url = require('../models/url.model');
const User = require('../models/user.model');

const passport = require('passport');

router.get('/:short_url', async (req, res) => {
    const short_url = req.params.short_url;
    const url = await Url.findOne({ short_url: short_url });
    if(url){
        if(url.expired){
            return res.json({ message: 'URL Expired' });
        }
        const now = new Date();
        const time = now.getTime();
        const createdAt = url.createdAt.getTime();
        console.log('diff',time - createdAt);

        if(time - createdAt > 172800){
            url.expired = true;
            await url.save();
            return res.json({ message: 'URL Expired' });
        }

        const user = await User.findById(url.owner);
        user.total_hits++;
        await user.save();
        url.hits++;
        await url.save();
        return res.redirect(url.original_url);
    }
    else{
        return res.json({ message: 'Invalid URL' });
    }
});


router.post('/create', passport.authenticate('jwt',{session:false}), async (req, res) => {
    const url = req.body.url;
    const user = req.user;
    const encoded_url = md5(url);
    let counter = 0;
    let short_url = encoded_url.substring(0, 6);
    while(await Url.findOne({ short_url: short_url })){
        short_url = encoded_url.substring(counter, counter + 6);
    }
    const newUrl = await Url.create({
        original_url: url,
        short_url: short_url,
        owner: user._id,
    });
    user.urls.push(newUrl._id);
    user.total_urls++;
    await user.save();
    return res.json({ 
        shorten_url: `https://url-shortner-isug.onrender.com/${newUrl.short_url}`,
        original_url: newUrl.original_url,
        message: 'URL shortened successfully'
    });
});

module.exports= router;