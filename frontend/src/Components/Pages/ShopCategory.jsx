// ShopCategory.jsx
import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from "../../Context/ShopContext";
import dropdown_icon from '../Asset/dropdown_icon.png';
import Items from "../Items/Items";

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);

    const handleBasketClick = (product) => {
        props.onBasketChange(prev => prev + 1); // Update basket count
    };

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt='' />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 30 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt='' />
                </div>
            </div>
            <div className="shopcategory-products">
                {all_product.map((item, i) => {
                    if (props.category === item.category) {
                        return (
                            <Items
                                key={i}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                new_price={item.new_price}
                                old_price={item.old_price}
                                stock_quantity={item.stock_quantity}
                                description={item.description}
                                onBasketClick={() => handleBasketClick(item.id)}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    );
};

export default ShopCategory;
