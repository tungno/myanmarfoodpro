import React from 'react';
import './CSS/Home.css';
import ShowProduct from "../ShowProduct/ShowProduct";
import Collection from "../Collection/Collection";
import ProductForYou from "../ProductForYou/ProductForYou";

const Home = ({onWishlistChange}) => {
    return (
        <div>
            <ShowProduct />
            <Collection />
            <ProductForYou onWishlistChange={onWishlistChange}/>
        </div>
    );
};

export default Home;