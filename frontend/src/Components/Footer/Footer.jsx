import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';
import logo from '../Assets/logo.png';  // Update the path according to your project structure
import facebookIcon from '../Assets/facebook.png';  // Update the path according to your project structure
import instagramIcon from '../Assets/instagram.png';  // Update the path according to your project structure

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className="footer">
            <div className="footer-section">
                <img src={logo} alt={t('logo_alt')} className="footer-logo"/>
            </div>
            <div className="footer-section">
                <h4>{t('information')}</h4>
                <ul>
                    <li>{t('about_us')}</li>
                    <li>{t('customer_service')}</li>
                </ul>
            </div>
            <div className="footer-section">
                <h4>{t('follow_us')}</h4>
                <div className="social-icons">
                    <img src={facebookIcon} alt={t('facebook_alt')} />
                    <img src={instagramIcon} alt={t('instagram_alt')} />
                </div>
            </div>
        </div>
    );
};

export default Footer;
