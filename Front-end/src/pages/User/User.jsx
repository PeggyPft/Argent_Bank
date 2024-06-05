import React from 'react';
import ViewTransactions from '../../components/viewTransactions/ViewTransactions';
import { useSelector } from 'react-redux';

const User = () => {
    const user = useSelector((state) => state.user.user);
    
    return (
        <main className="container_User main bg-dark">
        <div className="content_HeaderUser">
            <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
            <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <ViewTransactions
            title="Argent Bank Checking (x8349)"
            balance="$2,082.79"
            availableBalance="Available Balance"
        />
        <ViewTransactions
            title="Argent Bank Savings (x6712)"
            balance="$10,928.42"
            availableBalance="Available Balance"
        />
        <ViewTransactions
            title="Argent Bank Credit Card (x8349)"
            balance="$184.30"
            availableBalance="Current Balance"
        />       
    </main>
    );
};

export default User;