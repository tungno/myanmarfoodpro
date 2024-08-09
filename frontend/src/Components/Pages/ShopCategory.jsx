// ShopCategory.jsx
import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from "../../Context/ShopContext";
import dropdown_icon from '../Asset/dropdown_icon.png';
import Item from '../Item/Item';

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
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
        props.onWishlistChange(updateWishlist.length); // Update wishlist count
    };

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
                            <Item
                                key={i}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                new_price={item.new_price}
                                old_price={item.old_price}
                                description={item.description}
                                stock={item.stock}
                                isInWishlist={wishlist.includes(item.name)}
                                onWishlistClick={() => handleWishlistClick(item)}
                                onBasketClick={() => handleBasketClick(item)}
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
