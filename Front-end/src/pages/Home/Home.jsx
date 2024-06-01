import React from 'react';
import BannerHome from '../../components/bannerHome/BannerHome';
import Features from '../../components/features/Features';

const Home = () => {
    return (
        <div>
            <div>
                <BannerHome/>
                <Features/>
            </div>
        </div>
    );
};

export default Home;