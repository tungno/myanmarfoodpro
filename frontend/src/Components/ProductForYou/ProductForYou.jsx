import React, { useState } from 'react';
import './ProductForYou.css';
import lahphet from '../Assets/lahphet.png';
import suanthang from '../Assets/suanthang.png';
import wishlistIcon from '../Assets/wishlist1.png';
import filledWishlistIcon from '../Assets/filled_wishlist.png'; // Make sure this exists

const products = [
  {
    imgSrc: lahphet,
    name: "SUNTHANG",
    description: "Description for sunthang...",
    price: 25,
    currency: "NOK"
  },
  {
    imgSrc: suanthang,
    name: "LAHPET",
    description: "Description for lahpet...",
    price: 29,
    currency: "NOK"
  },
  {
    imgSrc: lahphet,
    name: "SUNTHANG",
    description: "Description for sunthang...",
    price: 25,
    currency: "NOK"
  },
  {
    imgSrc: suanthang,
    name: "LAHPET",
    description: "Description for lahpet...",
    price: 29,
    currency: "NOK"
  },
  {
    imgSrc: lahphet,
    name: "SUNTHANG",
    description: "Description for sunthang...",
    price: 25,
    currency: "NOK"
  },
  {
    imgSrc: suanthang,
    name: "LAHPET",
    description: "Description for lahpet...",
    price: 29,
    currency: "NOK"
  },
  {
    imgSrc: lahphet,
    name: "SUNTHANG",
    description: "Description for sunthang...",
    price: 25,
    currency: "NOK"
  },
  {
    imgSrc: suanthang,
    name: "LAHPET",
    description: "Description for lahpet...",
    price: 29,
    currency: "NOK"
  },
  // Add more products as needed
];

const ProductForYou = ({ onWishlistChange }) => {
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
                <p>{product.price} {product.currency}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

export default ProductForYou;