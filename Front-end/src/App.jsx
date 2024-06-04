import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { restoreUser } from './Slices/userSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Sign_In from './pages/Sign_In/Sign_In';
import User from './pages/User/User';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(restoreUser());
    }, [dispatch]);

    return (
        <BrowserRouter>    
            <Header/>  
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/sign-in" element={<Sign_In/>}/>
                    <Route path="/profile" element={<User/>}/>
                </Routes>
            <Footer/>
        </BrowserRouter>
  );
};
    

export default App;