import React from 'react';
import './Footer1.css';
import klarnaIcon from '../Assets/klarna.png';  // Update the path according to your project structure
import dhlIcon from '../Assets/dhl.png';  // Update the path according to your project structure

const Footer1 = () => {
    return (
        <div className="footer-bottom">
            <h4>Shop and pay safe with us!</h4>
            <div className="payment-icons">
                <img src={klarnaIcon} alt="Klarna" className="icon"/>
                <img src={dhlIcon} alt="DHL" className="icon"/>
            </div>
        </div>
    );
};

export default Footer1;