import React from 'react';
import logoBanner from '../../assets/img/argentBankLogo.png';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className='main-nav'>
            <Link to="/" className='main-nav-logo'><img src={logoBanner} alt="Logo Argent Bank" className='main-nav-logo-image'/>
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <Link to="/sign-in" className='main-nav-item'><i className="fa fa-user-circle"> <span>Sign In</span> </i></Link>
        </div>

    );
};

export default Header;