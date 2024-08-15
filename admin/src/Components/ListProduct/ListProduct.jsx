import React, {useEffect, useState} from 'react';
import cross_icon from '../../assets/cross_icon.png';
import './ListProduct.css';

const API_BASE_URL ="http://34.79.169.45:8080";

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch(`${API_BASE_URL}/products`)
            .then((res) => res.json())
            .then((data) => { setAllProducts(data); });
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const remove_product = async (id) => {
        await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        await fetchInfo();
    }

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Products description</p>
                <p>Category</p>
                <p>Stock Quantity</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {Array.isArray(allProducts) && allProducts.length > 0 ? (
                    allProducts.map((product) => (
                        <div key={product.id}>
                            <div className="listproduct-format-main listproduct-format">
                                <img src={product.image} alt="" className="listproduct-product-icon"/>
                                <p>{product.name}</p>
                                <p>{product.description}</p>
                                <p>{product.category}</p>
                                <p>{product.stock_quantity}</p>
                                <p>{product.old_price} NOK</p>
                                <p>{product.new_price} NOK</p>
                                <img
                                    onClick={() => { remove_product(product.id); }}
                                    className='listproduct-remove-icon'
                                    src={cross_icon}
                                    alt=''
                                />
                            </div>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
};

export default ListProduct;
