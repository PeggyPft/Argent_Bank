import React from 'react';
import featuresData from '../../data/features.json';

const Features = () => {
    return (
        <section className='features'>
            {featuresData.map(feature => (
            <div key={feature.id} className='feature-item'>               
                <img src={feature.image} alt="" className='feature-icon' />
                <h3 className='feature-item-title'>{feature.title}</h3>
                <p>{feature.paragraph}</p>                
            </div>
            ))}
        </section>
    );
};

export default Features;