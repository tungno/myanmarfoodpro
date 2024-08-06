import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import Navbar from "./Components/Navbar/Navbar";
import ProductForYou from "./Components/ProductForYou/ProductForYou";
import Footer from "./Components/Footer/Footer";
import Footer1 from "./Components/Footer/Footer1";
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Components/Pages/Home";


function App() {
    const [wishlistCount, setWishlistCount ] = useState(0);

    const handleWishlistChange = (count) => {
        setWishlistCount(count);
    };
    return (
    <div className="App">
      <BrowserRouter>
        <Navbar wishlistCount={wishlistCount}/>
        <Routes>
            <Route path='/' element={<Home onWishlistChange={handleWishlistChange}/>}/>
        </Routes>
        <Footer />
        <Footer1 />
      </BrowserRouter>
    </div>
  );
}

export default App;
