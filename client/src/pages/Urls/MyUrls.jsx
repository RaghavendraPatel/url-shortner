import { useState,useEffect } from "react";
import './MyUrls.scss'

const MyUrls = ({user}) => {
    const base_url = 'https://url-shortner-isug.onrender.com/'
    const [profile, setProfile] = useState(null)
    const [urls, setUrls] = useState(null)
    const getProfile = async () => {
      const res = await axios.get(
        'https://url-shortner-isug.onrender.com/user/profile',
         {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
         }
      )
      console.log(res.data);
      setProfile(res.data);
      setUrls(res.data.urls);
    }
    const copy = (url) => {
        navigator.clipboard.writeText(url);
    }
    useEffect(() => {
        getProfile();
    }, [])

    return (
        <div className="my__urls">
            <h1>My Urls</h1>

            <div className="my__urls__list">
                <div className="my__urls__item">
                    <div className="my__urls__item__original">
                        <p>Original Url</p>
                    </div>
                    <div className="my__urls__item__short">
                        <p>Short Url</p>
                    </div>
                    <div className="my__urls__item__status">
                        <p>Status</p>
                    </div>
                    <div className="my__urls__item__visits">
                        <p>Visits</p>
                    </div>
                </div>
                {
                    urls && urls.map((url) => (
                        <div className="my__urls__item" key={url._id}>
                            <div className="my__urls__item__original">
                                <p>{url.original_url}</p>
                            </div>
                            <div className="my__urls__item__short">
                                <p>{`https://url-shortner-isug.onrender.com/${url.short_url}`}</p>
                                <button onClick={()=>{copy(`https://url-shortner-isug.onrender.com/${url.short_url}`)}}>Copy</button>
                            </div>
                            <div className="my__urls__item__status">
                                {url.expired? <p>Expired</p>:<p>Active</p>}
                            </div>
                            <div className="my__urls__item__visits">
                                <p>{url.hits}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
export default MyUrls;