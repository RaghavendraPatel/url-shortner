import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import './Auth.scss'

const Signup = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirmPassword').value;
        if(password !== confirmPassword){
            toast.error('Passwords do not match');
            return;
        }
        try{
            const res = await axios.post(
                'https://url-shortner-isug.onrender.com/user/signup',
                {email,password},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(res.data);
            toast.success('Signed up successfully');
            navigate('/signin');
        }catch(err){
            console.log(err);
            toast.error('Error signing up');
        }
    }
    return(
        <div className="SignUp auth">
            <div className="container">
                <div className="header">
                    <h1>Sign Up</h1>
                </div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter email" id="email"/>
                        <input type="password" placeholder="Enter password" id="password"/>
                        <input type="password" placeholder="Confirm password" id="confirmPassword"/>
                        <button >Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Signup;