import React, {useContext, useEffect, useState} from 'react';
import './RelatedProducts.css';
import Items from "../../../Items/Items";
import {ShopContext} from "../../../../Context/ShopContext";

const API_BASE_URL = "http://34.79.169.45:8080";

const RelatedProducts = ({category, id}) => {

    const [related, setRelated] = useState([]);

    const {addToCart} = useContext(ShopContext);

    useEffect(() => {
        fetch(`${API_BASE_URL}/relatedproducts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: JSON.stringify({category: category})
        })
            .then ((res)=> res.json()).then((data)=>setRelated(data))
    }, []);
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {related.map((item, i) => {
                if (id != item.id) {
                    return <Items
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                        stock_quantity={item.stock_quantity}
                        description={item.description}
                        onBasketClick={() => addToCart(item.id)}
                    />
                }
            })}
        </div>

    </div>
  );
};

export default RelatedProducts;
