import React, {useState} from 'react';
import './RelatedProducts.css';
import data_product from "../../../Asset/data";
import Items from "../../../Items/Items";

const RelatedProducts = (props) => {

    const handleBasketClick = (product) => {
        props.onBasketChange(prev => prev + 1); // Update basket count
    };

  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {data_product.map((item, i) => {
                return <Items
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
            })}
        </div>

    </div>
  );
};

export default RelatedProducts;