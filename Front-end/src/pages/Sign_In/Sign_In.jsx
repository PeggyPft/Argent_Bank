import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfile, loginUser} from '../../Slices/userSlice';
import {useNavigate} from 'react-router-dom';

const Sign_In = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector((state) => state.user.status);
    const token = useSelector((state) => state.user.token);
    const error = useSelector((state) => state.user.error);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({email, password}));
    };

    useEffect(() => {
        if (status === 'succeeded' && token) {
            dispatch(getUserProfile());
        }
    }, [status, token, dispatch]);

    useEffect(() => {
        if (status === 'succeeded' && localStorage.getItem('user')) {
            navigate('/profile');
        }
    }, [status, navigate]);

    return (
        <main className="main bg-dark">
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div> 
                <button className="sign-in-button" type="submit">Sign In</button>
                {status ==='failed' && <p className='errorLogin'>Saisie incorrecte</p> }
            </form>
    </section>
  </main>
    );
};

export default Sign_In;
