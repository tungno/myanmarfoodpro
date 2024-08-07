import React from 'react';
import './CSS/Home.css';
import ShowProduct from '../ShowProduct/ShowProduct';
import Collection from '../Collection/Collection';
import ProductForYou from '../ProductForYou/ProductForYou';

const Home = ({ onWishlistChange, onBasketChange }) => { // Add basket handler prop
    return (
        <div>
            <ShowProduct />
            <Collection />
            <ProductForYou onWishlistChange={onWishlistChange} onBasketChange={onBasketChange} /> {/* Pass basket handler */}
        </div>
    );
};

export default Home;
