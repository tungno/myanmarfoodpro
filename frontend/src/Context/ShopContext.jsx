// ShopContext.jsx
import React, {createContext, useEffect, useState} from 'react';
//import all_product from '../Components/Asset/all_product'; // Ensure the correct path to the all_product file.

export const ShopContext = createContext();

const API_BASE_URL = "http://34.79.169.45:8080";

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 33; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch(`${API_BASE_URL}/products`)
            .then((response)=>response.json())
            .then((data)=>setAll_Product(data))

        if (localStorage.getItem("auth-token")) {
            fetch(`${API_BASE_URL}/getcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => { setCartItems(data) })
                .catch(error => {
                    console.error("Failed to fetch cart data:", error);
                });
        }
    }, []);

    const addToCart =(itemId) => {
        if (!localStorage.getItem("auth-token")) {
            alert("Please Login");
            return;
        }
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        if (localStorage.getItem('auth-token')){
            fetch(`${API_BASE_URL}/addtocart`,{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
                .then((response)=>response.json())
                .then((data)=> console.log(data))
                .catch(error => {
                    console.error("Failed to add to cart:", error);
                });
        }
    };
    const removeFromCart =(itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
        if (localStorage.getItem('auth-token')){
            fetch(`${API_BASE_URL}/removefromcart`,{
                method:'DELETE',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
                .then((response)=>response.json())
                .then((data)=> console.log(data))
                .catch(error => {
                    console.error("Failed to remove from cart:", error);
                });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo && itemInfo.new_price) {
                    totalAmount += cartItems[item] * itemInfo.new_price;
                } else {
                    console.warn(`Product with ID ${item} not found or missing price`);
                }
            }
        }
        return totalAmount;
    }
    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider; // Exporting the context provider.
