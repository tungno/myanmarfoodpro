import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './ProductDisplay.css';
import star_icon from '../../../Asset/star_icon.png';
import star_dull_icon from '../../../Asset/star_dull_icon.png';
import { ShopContext } from '../../../../Context/ShopContext';
import basket from '../../../Assets/cart.png';
import inStockIcon from '../../../Assets/in_stock.png';
import fewInStockIcon from '../../../Assets/few_in_stock.png';
import outOfStockIcon from '../../../Assets/out_of_stock.png';

const ProductDisplay = ({ product }) => {
    const { t } = useTranslation();
    const { addToCart } = useContext(ShopContext);

    const getStockStatus = (stock_quantity) => {
        if (stock_quantity === 0) {
            return t('out_of_stock');
        } else if (stock_quantity > 0 && stock_quantity < 10) {
            return t('few_in_stock');
        } else {
            return t('in_stock');
        }
    };

    const getStockIcon = (stock_quantity) => {
        const status = getStockStatus(stock_quantity);
        switch (status) {
            case t('in_stock'):
                return inStockIcon;
            case t('few_in_stock'):
                return fewInStockIcon;
            case t('out_of_stock'):
                return outOfStockIcon;
            default:
                return null;
        }
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="img"/>
                    <img src={product.image} alt="img"/>
                    <img src={product.image} alt="img"/>
                    <img src={product.image} alt="img"/>
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt="img"/>
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt=""/>
                    <img src={star_icon} alt=""/>
                    <img src={star_icon} alt=""/>
                    <img src={star_icon} alt=""/>
                    <img src={star_dull_icon} alt=""/>
                    <p>({product.reviews_count || 0})</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                <div className="buttom-basket">
                    <button onClick={() => addToCart(product.id)}>
                        {t('add_to_cart')}
                    </button>
                    <img className="basket" src={basket} alt={t('basket_alt')}/>
                </div>

                <div className="stock-status">
                    <img src={getStockIcon(product.stock_quantity)} alt={getStockStatus(product.stock_quantity)} />
                    <span>{getStockStatus(product.stock_quantity)}</span>
                </div>

                <p className="productdisplay-right-category">
                    <span>{t('category_label')} :</span> {product.category}, {product.name}
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;
