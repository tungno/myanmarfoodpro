import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ProductForYou.css';
import Items from '../../../Items/Items';
import { API_BASE_URL } from "../../../../App";

const ProductForYou = () => {
    const { t } = useTranslation();
    const [productForYou, setProductForYou] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/productforyou`)
            .then((response) => response.json())
            .then((data) => setProductForYou(data))
            .catch((error) => console.error('Error fetching products for you:', error)); // Added error handling
    }, []);

    return (
        <div className='product-for-you'>
            <h2>{t('products_for_you')}</h2>
            <hr />
            <div className="product-list">
                {productForYou.map((item) => (
                    <Items
                        key={item.id} // Use item.id as the unique key
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
