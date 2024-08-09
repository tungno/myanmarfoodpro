import React from 'react';
import './ProductForYou.css';
import new_collections from '../../../Asset/new_collections';
import Items from '../../../Items/Items';

const ProductForYou = ({ onBasketChange }) => {


  const handleBasketClick = (id) => {
    onBasketChange(prev => prev + 1);
  };

  return (
      <div className='product-for-you'>
        <h2>Products for you</h2>
        <hr />
        <div className="product-list">
          {new_collections.map((item, i) => (
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
          ))}
        </div>
      </div>
  );
};

export default ProductForYou;
