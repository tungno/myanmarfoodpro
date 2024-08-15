import React, {useEffect, useState} from 'react';
import './ProductForYou.css';
import Items from '../../../Items/Items';
import {API_BASE_URL} from "../../../../App";


const ProductForYou = () => {
    const [productForYou, setProductForYou] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/productforyou`)
            .then((response)=>response.json())
            .then((data)=>setProductForYou(data));
    }, []);
  return (
      <div className='product-for-you'>
        <h2>Products for you</h2>
        <hr />
        <div className="product-list">
          {productForYou.map((item, i) => (
              <Items
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                  stock_quantity={item.stock_quantity}
                  description={item.description}
              />
          ))}
        </div>
      </div>
  );
};

export default ProductForYou;
