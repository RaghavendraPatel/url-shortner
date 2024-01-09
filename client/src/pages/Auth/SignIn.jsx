import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SignIn = (props) => {
    const navigate = useNavigate();
    const {user,setUser} = props.props;
    useEffect(() => {
        if(user){
            navigate('/');
        }
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const remember = document.querySelector('#remember').checked;
        try{
            const res = await axios.post(
                'https://url-shortner-isug.onrender.com/user/signin',
                {email,password},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(res.data);
            setUser(
                {
                    token: res.data.token,
                    user: res.data.user,
                }
            );
            console.log(user)
            if(remember){
                localStorage.setItem('user',JSON.stringify(
                    {
                        token: res.data.token,
                        user: res.data.user,
                    }
                ));
            }
            
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="SignIn auth">
            <div className="container">
                <div className="header">
                    <h1>Sign In</h1>
                </div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter email" id="email"/>
                        <input type="password" placeholder="Enter password" id="password"/>
                        <div className="remember">
                            <input type="checkbox" name="" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <button >Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;