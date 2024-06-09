import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfile, loginUser} from '../../Slices/userSlice';
import {useNavigate, Link} from 'react-router-dom';

const Sign_In = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector((state) => state.user.status);
    const token = useSelector((state) => state.user.token);

    const tokenRef = useRef(token); /* Référence mutable pour stocker le token actuel*/

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({email, password}));
    };    

    useEffect(() => {
        /* Vérifier si le token a changé */
        if (tokenRef.current !== token && status === 'succeeded' && token) {
            dispatch(getUserProfile())
                .unwrap()
                .then(() => {
                    navigate('/profile');
                })
                .catch((err) => {
                    console.error('Failed to get user profile:', err);
                });
            /* Mettre à jour la référence du token */
            tokenRef.current = token;
        }
    }, [status, token, dispatch, navigate]);

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
                <div className='sign-up-content'>
                    <p>New customer ?</p>
                    <Link to="/sign-up">Sign Up</Link>
                </div>
            </form>
    </section>
  </main>
    );
};

export default Sign_In;
