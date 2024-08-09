import React from 'react';
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";
import './Category.css';
import seafood from '../../../Assets/spicyfood.png';
import farmfood from '../../../Assets/healthyfood.png';
import traditionalfood from '../../../Assets/traditionalfood.png';
import snackfood from '../../../Assets/recommendedfood.png';

const Category = () => {
    const { t } = useTranslation();

    return (
        <div className="collection">
            <div className="collection-item">
                <Link style={{textDecoration: 'none'}} to='/seafoods'>
                <h4>{t('sea_food')}</h4>
                <img src={seafood} alt={t('sea_food')} />
                </Link>
            </div>
            <div className="collection-item">
                <Link style={{textDecoration: 'none'}} to='/farmfoods'>
                <h4>{t('farm_food')}</h4>
                <img src={farmfood} alt={t('farm_food')} />
                </Link>
            </div>
            <div className="collection-item">
                <Link style={{textDecoration: 'none'}} to='/traditionalfoods'>
                <h4>{t('traditional_food')}</h4>
                <img src={traditionalfood} alt={t('traditional_food')} />
                </Link>
            </div>
            <div className="collection-item">
                <Link style={{textDecoration: 'none'}} to='/snackfoods'>
                <h4>{t('snack_food')}</h4>
                <img src={snackfood} alt={t('snack_food')} />
                </Link>
            </div>
        </div>
    );
};

export default Category;