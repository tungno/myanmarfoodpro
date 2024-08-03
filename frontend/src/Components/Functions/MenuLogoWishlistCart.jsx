import React, {useState} from 'react';
import closeIcon from "../Assets/crossmenu.png";
import hamburgerIcon from "../Assets/humbergermenu.png";
import {Link} from "react-router-dom";
import logo from "../Assets/logo.png";
import wishlist from "../Assets/wishlist.png";
import cart from "../Assets/cart.png";

const MenuLogoWishlistCart = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
  return (
      <div className="navbar-left-menu-logo-wishlist1-cart1">
          <div className="navbar-menu-icon" onClick={toggleMenu}>
              <img src={menuOpen ? closeIcon : hamburgerIcon} alt="Menu Icon"/>
          </div>
          <div className="navbar-item navbar-logo">
            <Link to="/">
                <img src={logo} alt="MMFood Logo"/>
            </Link>
          </div>
          <div className="navbar-wishlist-cart">
            <a href="#" className="navbar-item">
                <img src={wishlist} alt="Wishlist"/>
            </a>
            <a href="#" className="navbar-item">
                <img src={cart} alt="Cart"/>
            </a>
          </div>
      </div>
  );
};

export default MenuLogoWishlistCart;