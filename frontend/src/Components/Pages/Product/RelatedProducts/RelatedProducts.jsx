import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './RelatedProducts.css';
import Items from "../../../Items/Items";
import { ShopContext } from "../../../../Context/ShopContext";
import { API_BASE_URL } from "../../../../App";

const RelatedProducts = ({ category, id }) => {
    const { t } = useTranslation();
    const [related, setRelated] = useState([]);
    const { addToCart } = useContext(ShopContext);

    useEffect(() => {
        fetch(`${API_BASE_URL}/relatedproducts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', // Added content-type header for proper API request
            },
            body: JSON.stringify({ category })
        })
            .then((res) => res.json())
            .then((data) => setRelated(data))
            .catch((error) => console.error('Error fetching related products:', error)); // Added error handling
    }, [category]); // Added category as a dependency to refetch when category changes

    return (
        <div className='relatedproducts'>
            <h1>{t('related_products')}</h1>
            <hr />
            <div className="relatedproducts-item">
                {related.map((item) => (
                    id !== item.id && (
                        <Items
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                            stock_quantity={item.stock_quantity}
                            description={item.description}
                            onBasketClick={() => addToCart(item.id)}
                        />
                    )
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
