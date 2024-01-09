import { Link,useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import './Navbar.scss'
const Navbar = (props) => {
    const {user,setUser} = props.props;
    const navigate = useNavigate();
    const logout = async () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
        toast.success('Logged out');
    }
    return (
        <nav className="navbar">
            <div className="nav__logo">
                <Link to='/'><h1>Short Url</h1></Link>
            </div>
            {!user &&
                <div className="nav__links">
                    <Link to='/signin' className="nav__link">Sign In</Link>
                    <Link to='/signup' className="nav__link">Sign Up</Link>
                </div>
            }
            {user &&
                <div className="nav__links">
                    <Link to='/' className="nav__link">Home</Link>
                    <Link to='/urls' className="nav__link">My Urls</Link>
                    <button className="nav__link" onClick={logout}>Logout</button>
                </div>
            }
        
        </nav>
    );
};

export default Navbar;