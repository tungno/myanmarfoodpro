import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import wishlistIcon from '../Assets/wishlist1.png';
import filledWishlistIcon from '../Assets/filled_wishlist.png';
import inStockIcon from '../Assets/in_stock.png';
import fewInStockIcon from '../Assets/few_in_stock.png';
import outOfStockIcon from '../Assets/out_of_stock.png';
import basketIcon from '../Assets/cart.png';

const Item = ({ id, name, image, new_price, old_price, description, stock, isInWishlist, onWishlistClick, onBasketClick }) => {
    const getStockIcon = (stock) => {
        switch (stock) {
            case 'in stock':
                return inStockIcon;
            case 'few in stock':
                return fewInStockIcon;
            case 'out of stock':
                return outOfStockIcon;
            default:
                return null;
        }
    };

    return (
        <div className='item'>
            <div className='wishlist-icon' onClick={onWishlistClick}>
                <img src={isInWishlist ? filledWishlistIcon : wishlistIcon} alt="Wishlist" />
            </div>
            <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
                <img src={image} alt={name} />
            </Link>
            <h4>{name}</h4>
            <p>{description}</p>
            <div className="stock-status">
                <img src={getStockIcon(stock)} alt={stock} />
                <span>{stock}</span>
            </div>
            <div className="item-prices">
                <div className="item-price-old">
                    {old_price} NOK
                </div>
                <div className="item-price-new">
                    {new_price} NOK
                </div>
                <div className='basket-icon' onClick={onBasketClick}>
                    <img src={basketIcon} alt="Basket"/>
                </div>
            </div>
        </div>
    );
};

export default Item;
