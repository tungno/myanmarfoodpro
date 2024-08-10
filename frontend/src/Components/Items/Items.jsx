import React, {useContext} from 'react';
import './Items.css';
import wishlistIcon from '../Assets/wishlist1.png';
import inStockIcon from '../Assets/in_stock.png';
import fewInStockIcon from '../Assets/few_in_stock.png';
import outOfStockIcon from '../Assets/out_of_stock.png';
import basketIcon from '../Assets/cart.png';
import { Link } from "react-router-dom";
import {ShopContext} from "../../Context/ShopContext";

const Items = ({ id, name, image, new_price, old_price, stock_quantity, description }) => {

    const {addToCart} = useContext(ShopContext);

    const getStockStatus = (stock_quantity) => {
        if (stock_quantity === 0) {
            return 'out of stock';
        } else if (stock_quantity > 0 && stock_quantity < 10) {
            return 'few in stock';
        } else {
            return 'in stock';
        }
    };

    const getStockIcon = (stock_quantity) => {
        const status = getStockStatus(stock_quantity);
        switch (status) {
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
        <div className='item-card'>
            <div className="wishlist-icon" >
                <img src={wishlistIcon} alt="Wishlist" />
            </div>
            <Link to={`/product/${id}`} onClick={() => window.scrollTo(0,0)}>
                <img src={image} alt={name} />
            </Link>
            <h4>{name}</h4>
            <p>{description}</p>
            <div className="stock-status">
                <img src={getStockIcon(stock_quantity)} alt={getStockStatus(stock_quantity)} />
                <span>{getStockStatus(stock_quantity)}</span>
            </div>
            <div className="price-basket">
                <p className="old-price">{old_price} NOK</p>
                <p className="current-price">{new_price} NOK</p>
                <div className="basket-icon" >
                    <img onClick={() => {addToCart(id)}} src={basketIcon} alt="Basket" />
                </div>
            </div>
        </div>
    );
};

export default Items;
