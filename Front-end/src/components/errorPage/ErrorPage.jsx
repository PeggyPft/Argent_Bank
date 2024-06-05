import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ errorCode, errorAlert, errorMessage }) => {
    return (
        <div className='errorPage'>
            <h1>{errorCode}</h1>
            <p className='errorAlert'>{errorAlert}</p>
            <p className='errorMessage'>{errorMessage}</p>

            <div className='errorLink'>
                <Link to="/sign-in" className='link'>Retournez sur la page de connexion</Link>
            </div>            
        </div>
    );
};

export default ErrorPage;