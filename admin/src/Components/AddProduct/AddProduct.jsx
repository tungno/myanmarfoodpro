import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const API_BASE_URL = "https://backend.mmfood7.com";

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        image: "",
        category: "seafood",
        stock_quantity: "",
        new_price: "",
        old_price: ""
    });

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const Add_Product = async () => {
        try {
            let responseData;

            let product = {
                ...productDetails,
                stock_quantity: parseInt(productDetails.stock_quantity),
                new_price: parseFloat(productDetails.new_price),
                old_price: parseFloat(productDetails.old_price),
            };

            console.log("Final product payload: ", JSON.stringify(product));

            let formData = new FormData();
            formData.append('product', image);

            const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            responseData = await uploadResponse.json();

            if (responseData.success) {
                product.image = responseData.image_url;

                const productResponse = await fetch(`${API_BASE_URL}/products`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                const productData = await productResponse.json();

                if (!productResponse.ok) {
                    console.error("Error: ", productResponse.statusText);
                    alert("Failed to add product.");
                } else {
                    productData.success ? alert("Product Added"): alert("Failed");
                }
            } else {
                alert("Image upload failed");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            alert("An error occurred while adding the product");
        }
    }

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Product description</p>
                <input value={productDetails.description} onChange={changeHandler} type='text' name='description' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Product quantity</p>
                <input value={productDetails.stock_quantity} onChange={changeHandler} type='text' name='stock_quantity' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="seafood">Sea Food</option>
                    <option value="farmfood">Farm Food</option>
                    <option value="traditionalfood">Traditional Food</option>
                    <option value="snackfood">Snack Food</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default AddProduct;
