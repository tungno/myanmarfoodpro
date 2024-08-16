import React from 'react';
import { useTranslation } from 'react-i18next';
import './NewsLetter.css';

const NewsLetter = () => {
    const { t } = useTranslation();

    return (
        <div className='newsletter'>
            <h1>{t('exclusive_offers_title')}</h1>
            <p>{t('subscribe_message')}</p>
            <div>
                <input type="email" placeholder={t('email_placeholder')} />
                <button>{t('subscribe_button')}</button>
            </div>
        </div>
    );
}

export default NewsLetter;
