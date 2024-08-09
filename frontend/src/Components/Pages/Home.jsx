import React from 'react';
import './CSS/Home.css';
import ShowProduct from './Homepage/ShowProduct/ShowProduct';
import Category from './Homepage/Category/Category';
import ProductForYou from './Homepage/ProductForYou/ProductForYou';
import NewsLetter from "./Homepage/NewsLetter/NewsLetter";

const Home = ({ onWishlistChange, onBasketChange }) => { // Add basket handler prop
    return (
        <div>
            <ShowProduct />
            <Category />
            <ProductForYou onWishlistChange={onWishlistChange} onBasketChange={onBasketChange} /> {/* Pass basket handler */}
            <NewsLetter />
        </div>
    );
};

export default Home;
