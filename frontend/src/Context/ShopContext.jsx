// ShopContext.jsx
import React, {createContext, useEffect, useState} from 'react';
//import all_product from '../Components/Asset/all_product'; // Ensure the correct path to the all_product file.

export const ShopContext = createContext();

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
        fetch('http://localhost:8080/products')
            .then((response)=>response.json())
            .then((data)=>setAll_Product(data))

        if (localStorage.getItem("auth-token")) {
            fetch(`http://localhost:8080/getcart`, {
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
            fetch('http://localhost:8080/addtocart',{
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
            fetch('http://localhost:8080/removefromcart',{
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
                totalAmount += cartItems[item] * itemInfo.new_price;
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
