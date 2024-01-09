import './App.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes,Route} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Signin from './pages/Auth/Signin';
import MyUrls from './pages/Urls/MyUrls';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [urls, setUrls] = useState(null)
  const getProfile = async () => {
    const res = await axios.get(
      'http://localhost:8000/user/profile',
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
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      console.log(user);
      setUser(user);
    }
  }, [])

  useEffect(() => {
    if(user){
      getProfile();
    }
  }
  , [user])

  return (
    <div className="App">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar props = {{user,setUser}}/>
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/signin" element={<Signin props = {{user,setUser}}/>} />
          <Route path="/signup" element={<h1>Sign Up</h1>} />
          <Route path='/urls' element={<MyUrls urls={urls}/>} />
        </Routes>
    </div>
  )
}

export default App
