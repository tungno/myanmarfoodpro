import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Footer1 from './Components/Footer/Footer1';
import Home from './Components/Pages/Home';
import './App.css';
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Product from "./Components/Pages/Product";
import ShopCategory from "./Components/Pages/ShopCategory";
import Cart from "./Components/Pages/Cart";
import seafood_banner from './Components/Asset/banner_seafood.png';
import farmfood_banner from './Components/Asset/banner_farmfood.png';
import traditionalfood_banner from './Components/Asset/banner_traditionalfood.png';
import snackfood_banner from './Components/Asset/banner_snackfood.png';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://mmfood7.com";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/seafoods' element={<ShopCategory banner={seafood_banner} category="seafood" />} />
                    <Route path='/farmfoods' element={<ShopCategory banner={farmfood_banner} category="farmfood" />} />
                    <Route path='/traditionalfoods' element={<ShopCategory banner={traditionalfood_banner} category="traditionalfood" />} />
                    <Route path='/snackfoods' element={<ShopCategory banner={snackfood_banner} category="snackfood" />} />
                    <Route path="/product" element={<Product />}>
                        <Route path=':productId' element={<Product />} />
                    </Route>
                    <Route path='/cart' element={<Cart />} />
                    <Route path="/login-signup" element={<LoginSignup />} />
                </Routes>
                <Footer />
                <Footer1 />
            </BrowserRouter>
        </div>
    );
}

export default App;
