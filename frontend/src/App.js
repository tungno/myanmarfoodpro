import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Footer1 from './Components/Footer/Footer1';
import Home from './Components/Pages/Home';
import './App.css';

function App() {
    const [wishlistCount, setWishlistCount] = useState(0);
    const [basketCount, setBasketCount] = useState(0); // Add basket count state

    const handleWishlistChange = (count) => {
        setWishlistCount(count);
    };

    const handleBasketChange = (count) => { // Add basket count handler
        setBasketCount(count);
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar wishlistCount={wishlistCount} basketCount={basketCount} /> {/* Pass basket count */}
                <Routes>
                    <Route path='/' element={<Home onWishlistChange={handleWishlistChange} onBasketChange={handleBasketChange} />} /> {/* Pass basket handler */}
                </Routes>
                <Footer />
                <Footer1 />
            </BrowserRouter>
        </div>
    );
}

export default App;
