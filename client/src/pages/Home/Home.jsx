import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import './Home.scss';

const Home = ({user}) => {
    const [shortUrl, setShortUrl] = useState('');
    const [showShortenUrl, setShowShortenUrl] = useState(false);
    useEffect(() => {
        console.log(user);
    }, [user]);
    const shortenUrl = async () => {
        console.log(user);
        if(!user) {
            toast.error('Please login to shorten url');
            return;
        }
        const url = document.querySelector('input').value;
        try{

            const res = await axios.post(
                'http://localhost:8000/create', 
                {url},
                {
                    headers: {   
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                }
            );
            setShortUrl(res.data.shorten_url);
            setShowShortenUrl(true);
        }catch(err){
            console.log(err);
        }
    }
    const copy = () => {
        const url = document.querySelector('.shorten__url input');
        url.select();
        url.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(url.value);
        toast.success('Copied to clipboard');
    }
    return (
      <div className="home">
        <div className="container">
            <div className="header">
                <h1>Short Url</h1>
                <h4>Create shorter url for your long url</h4>
            </div>
            <div className="form">
                <input type="text" placeholder="Enter url to shorten" />
                <button onClick={shortenUrl}>Shorten</button>
            </div>
            {showShortenUrl &&
                <div className="shorten__url">
                    <input type="text" value={shortUrl} disabled/>
                    <button onClick={copy}>Copy</button>
                </div>
            }
        </div>
      </div>
    );
};

export default Home;