import React from 'react';
import './CSS/Home.css';
import ShowProduct from './Homepage/ShowProduct/ShowProduct';
import Category from './Homepage/Category/Category';
import ProductForYou from './Homepage/ProductForYou/ProductForYou';
import NewsLetter from "./Homepage/NewsLetter/NewsLetter";

const Home = () => { // Add basket handler prop
    return (
        <div>
            <ShowProduct />
            <Category />
            <ProductForYou /> {/* Pass basket handler */}
            <NewsLetter />
        </div>
    );
};

export default Home;
