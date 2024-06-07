import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logoBanner from '../../assets/img/argentBankLogo.png';
import {Link} from 'react-router-dom';
import {logout} from '../../Slices/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isAuthenticated = !!useSelector((state) => state.user.token);

    const handleSignOut = () => {
        dispatch(logout());
    };

    return (
        <div className='main-nav'>
            <Link to="/" className='main-nav-logo'><img src={logoBanner} alt="Logo Argent Bank" className='main-nav-logo-image'/>
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {isAuthenticated ? (
                <div className='content-nav'>
                    <i className="fa fa-user-circle"> <span>{user.userName}</span></i>
                    <Link to="/" onClick={handleSignOut} > <i className='fa fa-sign-out'> <span>Sign Out</span></i></Link>
                </div>
            ) : (
                <Link to="/sign-in" className='main-nav-item'><i className="fa fa-user-circle"> <span>Sign In</span> </i></Link>
            )}
        </div>
    );
};

export default Header;