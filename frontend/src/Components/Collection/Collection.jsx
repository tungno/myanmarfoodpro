import React from 'react';
import { useTranslation } from 'react-i18next';
import './Collection.css';
import spicyfood from '../Assets/spicyfood.png';
import healthyfood from '../Assets/healthyfood.png';
import traditionalfood from '../Assets/traditionalfood.png';
import recommendedfood from '../Assets/recommendedfood.png';

const Collection = () => {
    const { t } = useTranslation();

    return (
        <div className="collection">
            <div className="collection-item">
                <h4>{t('spicy_food')}</h4>
                <img src={spicyfood} alt={t('spicy_food')} />
            </div>
            <div className="collection-item">
                <h4>{t('healthy_food')}</h4>
                <img src={healthyfood} alt={t('healthy_food')} />
            </div>
            <div className="collection-item">
                <h4>{t('traditional_food')}</h4>
                <img src={traditionalfood} alt={t('traditional_food')} />
            </div>
            <div className="collection-item">
                <h4>{t('recommended_food')}</h4>
                <img src={recommendedfood} alt={t('recommended_food')} />
            </div>
        </div>
    );
};

export default Collection;