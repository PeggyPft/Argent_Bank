import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '../../Slices/userSlice';
import {Link} from 'react-router-dom';

const Sign_Up = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const dispatch = useDispatch();
    const status = useSelector((state) => state.user.status);
    const errorMessage = useSelector((state) => state.user.error?.message);

    const handleSignUp = (e) => {
        e.preventDefault();       
        console.log('New user:', {firstName, lastName, email, password});
        if (firstName && lastName && email && password) {
            const userName = lastName;
            dispatch(createUser({ firstName, lastName, email, password, userName }));
        } else {
            setError('Merci de remplir tous les champs');
        }       
    };

    useEffect(() => {
        if (status === "succeeded") {
            setSuccessMessage('Votre compte a été créé avec succès. Veuillez vous connecter');
        } else if (status === 'failed') {
            setError(errorMessage);
        }
    }, [status, errorMessage]);

    return (
        <main className="main bg-dark">
            <section className="sign-up-content">
                <h1>Create an account</h1>
                {successMessage ? (
                    <>
                        <p className='successMessage'>{successMessage}</p>
                        <Link to="/sign-in">Sign In</Link>
                    </>
                ) : (
                <form onSubmit={handleSignUp}>
                    <div className="input-wrapper">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className={`sign-up-button ${!firstName || !lastName || !email || !password ? 'inactive' : ''}`} type="submit">Sign Up</button>
                    {error && (!firstName || !lastName || !email || !password) && <p className="errorMessage">{error}</p>}
                </form>
                )}
            </section>            
        </main>
    );
};

export default Sign_Up;