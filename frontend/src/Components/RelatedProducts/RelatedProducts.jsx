import React, {useState} from 'react';
import './RelatedProducts.css';
import data_product from "../Asset/data";
import Item from "../Item/Item";

const RelatedProducts = (props) => {
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
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {data_product.map((item, i) => {
                return <Item
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
            })}
        </div>

    </div>
  );
};

export default RelatedProducts;