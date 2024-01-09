const express = require('express');
const router = express.Router();

const User = require('../models/user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if(user){
        return res.json({ message: 'User already exists' });
    }
    const newUser = await User.create(req.body);
    return res.json({ message: 'User created' });
});

router.post('/signin', passport.authenticate('local',{session:false}), (req, res) => {
    const user = req.user;
    console.log(req.user);
    const body = { _id: user._id, email: user.email };
    const token = jwt.sign({user:body},process.env.JWT_SECRET)
    return res.json({ 
        message: 'Logged in successfully',
        token: token,
        user:user.email
    });
});

router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res) => {
    const user = req.user;
    
    // const user = User.findById(req.user._id).populate('urls').select('-password');
    return res.json(user);
});

module.exports = router;