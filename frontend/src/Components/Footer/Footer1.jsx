import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer1.css';
import klarnaIcon from '../Assets/klarna.png';  // Update the path according to your project structure
import dhlIcon from '../Assets/dhl.png';  // Update the path according to your project structure

const Footer1 = () => {
    const { t } = useTranslation();

    return (
        <div className="footer-bottom">
            <h4>{t('shop_and_pay_safe')}</h4>
            <div className="payment-icons">
                <img src={klarnaIcon} alt={t('klarna_alt')} className="icon"/>
                <img src={dhlIcon} alt={t('dhl_alt')} className="icon"/>
            </div>
        </div>
    );
};

export default Footer1;
