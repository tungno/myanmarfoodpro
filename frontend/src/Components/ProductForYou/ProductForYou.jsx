import React, { useState } from 'react';
import './ProductForYou.css';
import lahphet from '../Assets/lahphet.png';
import suanthang from '../Assets/suanthang.png';
import wishlistIcon from '../Assets/wishlist1.png';
import filledWishlistIcon from '../Assets/filled_wishlist.png';
import inStockIcon from '../Assets/in_stock.png';
import fewInStockIcon from '../Assets/few_in_stock.png';
import outOfStockIcon from '../Assets/out_of_stock.png';
import basketIcon from '../Assets/cart.png';

const products = [
  {
    imgSrc: lahphet,
    name: "SUNTHANG",
    description: "Description for sunthang...",
    price: 25,
    oldPrice: 30,
    currency: "NOK",
    stock: "in stock"
  },
  {
    imgSrc: suanthang,
    name: "LAHPET",
    description: "Description for lahpet...",
    price: 29,
    oldPrice: 35,
    currency: "NOK",
    stock: "few in stock"
  },
  {
    imgSrc: lahphet,
    name: "SUNTHANG1",
    description: "Description for sunthan1...",
    price: 25,
    oldPrice: 29,
    currency: "NOK",
    stock: "out of stock"
  },
  {
    imgSrc: suanthang,
    name: "LAHPET1",
    description: "Description for lahpet1...",
    price: 28,
    oldPrice: 35,
    currency: "NOK",
    stock: "in stock"
  },
  // Add more products as needed
];

const ProductForYou = ({ onWishlistChange, onBasketChange }) => { // Add basket handler prop
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
    onBasketChange(prev => prev + 1); // Increment basket count
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
          {products.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="wishlist-icon" onClick={() => handleWishlistClick(product)}>
                  <img src={wishlist.includes(product.name) ? filledWishlistIcon : wishlistIcon} alt="Wishlist" />
                </div>
                <img src={product.imgSrc} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <div className="stock-status">
                  <img src={getStockIcon(product.stock)} alt={product.stock} />
                  <span>{product.stock}</span>
                </div>
                <div className="price-basket">
                  <p className="old-price">{product.oldPrice} {product.currency}</p>
                  <p className="current-price">{product.price} {product.currency}</p>
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
