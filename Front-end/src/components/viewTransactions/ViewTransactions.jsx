import React from 'react';

const ViewTransactions = ({title, balance, availableBalance}) => {
    return (
        <div>
            <div className='container_viewTransactions'>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">{title}</h3>
                        <p className="account-amount">{balance}</p>
                        <p className="account-amount-description">{availableBalance}</p>
                    </div>     
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>   
                </section>
             </div>
        </div>
    );
};

export default ViewTransactions;