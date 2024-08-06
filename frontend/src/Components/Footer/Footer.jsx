import React from 'react';
import './Footer.css';
import logo from '../Assets/logo.png';  // Update the path according to your project structure
import facebookIcon from '../Assets/facebook.png';  // Update the path according to your project structure
import instagramIcon from '../Assets/instagram.png';  // Update the path according to your project structure

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-section">
                <img src={logo} alt="MMFOOD Logo" className="footer-logo"/>
            </div>
            <div className="footer-section">
                <h4>Information</h4>
                <ul>
                    <li>About Us</li>
                    <li>Customer Service</li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>Follow us</h4>
                <div className="social-icons">
                    <img src={facebookIcon} alt="Facebook"/>
                    <img src={instagramIcon} alt="Instagram"/>
                </div>
            </div>

        </div>
    );
};

export default Footer;