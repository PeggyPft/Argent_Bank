import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from './Slices/userSlice';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Sign_In from './pages/Sign_In/Sign_In';
import User from './pages/User/User';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ErrorPage from './components/errorPage/ErrorPage';

function App () {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);

    useEffect(() => {
        dispatch(restoreUser());
    }, [dispatch]);

/* Ajout de useEffect pour afficher les valeurs actuelles de "user" et "token" dans la console à des fins de débogage.
A supprimer en fin de projet */
    useEffect(() => {
    }, [user, token]);

    return (
        <BrowserRouter>    
            <Header/>  
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/sign-in" element={<Sign_In/>}/>
                    {token ? (
                        <>
                            <Route path="/profile" element={<User/>}/>
                        </>
                    ) : (
                        <>
                            <Route path="/profile" element={<Navigate to="/error/401"/>}/>
                        </>
                    )}
                    <Route path="*" element={<ErrorPage errorCode="404" errorAlert="Erreur" errorMessage="La page que vous avez demandée est introuvable"/>}/>
                    <Route path="/error/401" element={<ErrorPage errorCode="401" errorAlert="Authentification requise" errorMessage="Vous devez vous connecter pour accéder à cette page"/>}/>
                </Routes>
            <Footer/>
        </BrowserRouter>
  );
};
    

export default App;