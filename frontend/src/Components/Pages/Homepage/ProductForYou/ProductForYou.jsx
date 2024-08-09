import React, { useState } from 'react';
import './ProductForYou.css';
import wishlistIcon from '../../../Assets/wishlist1.png';
import filledWishlistIcon from '../../../Assets/filled_wishlist.png';
import inStockIcon from '../../../Assets/in_stock.png';
import fewInStockIcon from '../../../Assets/few_in_stock.png';
import outOfStockIcon from '../../../Assets/out_of_stock.png';
import basketIcon from '../../../Assets/cart.png';
import new_collections from '../../../Asset/new_collections';

const ProductForYou = ({ onWishlistChange, onBasketChange }) => {
  const [wishlist, setWishlist] = useState([]);

  const handleWishlistClick = (product) => {
    const updateWishlist = [...wishlist];
    const productIndex = updateWishlist.indexOf(product.name);

    if (productIndex > -1) {
      updateWishlist.splice(productIndex, 1);
    } else {
      updateWishlist.push(product.name);
    }

    setWishlist(updateWishlist);
    onWishlistChange(updateWishlist.length);
  };

  const handleBasketClick = (product) => {
    onBasketChange(prev => prev + 1);
  };

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
      <div className="product-for-you">
        <h2>Products for you:</h2>
        <div className="product-list">
          {new_collections.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="wishlist-icon" onClick={() => handleWishlistClick(product)}>
                  <img src={wishlist.includes(product.name) ? filledWishlistIcon : wishlistIcon} alt="Wishlist" />
                </div>
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <div className="stock-status">
                  <img src={getStockIcon(product.stock)} alt={product.stock} />
                  <span>{product.stock}</span>
                </div>
                <div className="price-basket">
                  <p className="old-price">{product.old_price} NOK</p>
                  <p className="current-price">{product.new_price} NOK</p>
                  <div className="basket-icon" onClick={() => handleBasketClick(product)}>
                    <img src={basketIcon} alt="Basket" />
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default ProductForYou;
