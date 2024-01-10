import './App.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes,Route} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Signin from './pages/Auth/Signin';
import MyUrls from './pages/Urls/MyUrls';
import { useEffect, useState } from 'react';
import Signup from './pages/Auth/Signup';

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      console.log(user);
      setUser(user);
    }
  }, [])


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
          <Route path="/signup" element={<Signup/>} />
          <Route path='/urls' element={<MyUrls user={user}/>} />
        </Routes>
    </div>
  )
}

export default App
