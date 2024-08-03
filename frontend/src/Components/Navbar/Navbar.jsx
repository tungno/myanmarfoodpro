import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import wishlist from '../Assets/wishlist.png';
import cart from '../Assets/cart.png';
import profile from '../Assets/profile.png';
import location from '../Assets/location.png';
import languageIcon from '../Assets/language.png';
import downArrowIcon from '../Assets/downArrowIcon.png';
import hamburgerIcon from '../Assets/humbergermenu.png';
import closeIcon from '../Assets/crossmenu.png';
import { getLocation } from "../../services/locationService";

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [country, setCountry] = useState('Loading...');
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showProductsDropdown, setShowProductsDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetchLocation = async () => {
            const locationData = await getLocation();
            if (locationData) {
                setCountry(locationData.country_name);
            } else {
                setCountry('Unknown');
            }
        }
        fetchLocation();
    }, []);

    const handleCountryMouseEnter = () => {
        setShowCountryDropdown(true);
    };
    const handleCountryMouseLeave = () => {
        setShowCountryDropdown(false);
    };

    const handleLanguageMouseEnter = () => {
        setShowLanguageDropdown(true);
    };
    const handleLanguageMouseLeave = () => {
        setShowLanguageDropdown(false);
    };

    const handleProductsClick = () => {
        setShowProductsDropdown(!showProductsDropdown);
    };

    const handleCountrySelect = (country) => {
        setCountry(country);
        setShowCountryDropdown(false);
    };

    const handleLanguageSelect = (lng) => {
        i18n.changeLanguage(lng);
        setShowLanguageDropdown(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-section navbar-group-1">
                <div className="navbar-menu-icon" onClick={toggleMenu}>
                    <img src={menuOpen ? closeIcon : hamburgerIcon} alt="Menu Icon"/>
                </div>
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={logo} alt="MMFood Logo"/>
                    </Link>
                </div>
                <div className="navbar-section navbar-wishlist-cart1">
                    <a href="#" className="navbar-item wishlist-cart">
                        <img src={wishlist} alt="Wishlist"/>
                    </a>
                    <a href="#" className="navbar-item wishlist-cart">
                        <img src={cart} alt="Cart"/>
                    </a>
                </div>
            </div>

            <div className="navbar-section navbar-group-2">
                <div className="navbar-search">
                    <input type="text" placeholder={t('search')}/>
                </div>
            </div>

            <div className="navbar-section navbar-group-3">
                <div className="navbar-item" onMouseEnter={handleCountryMouseEnter}
                     onMouseLeave={handleCountryMouseLeave}>
                    <img src={location} alt="Location" className="location-icon"/>
                    <div className="deliver-to">
                        <span className="normal-text">{t('deliver_to')}</span>
                        <span className="country bold-text">{country}</span>
                        <img src={downArrowIcon} alt="Dropdown" className="down-arrow-icon"/>
                    </div>
                    {showCountryDropdown && (
                        <div className="dropdown-location-language">
                            <div onClick={() => handleCountrySelect('Norway')}>{t('norway')}</div>
                            <div onClick={() => handleCountrySelect('Sweden')}>{t('sweden')}</div>
                            <div onClick={() => handleCountrySelect('Denmark')}>{t('denmark')}</div>
                            <div onClick={() => handleCountrySelect('Finland')}>{t('finland')}</div>
                        </div>
                    )}
                </div>
                <div className="navbar-item" onMouseEnter={handleLanguageMouseEnter}
                     onMouseLeave={handleLanguageMouseLeave}>
                    <img src={languageIcon} alt="Language" className="language-icon"/>
                    <div className="language-select">
                        <span className="bold-text">{t('language')}</span>
                        <img src={downArrowIcon} alt="Dropdown" className="down-arrow-icon"/>
                    </div>
                    {showLanguageDropdown && (
                        <div className="dropdown-location-language">
                            <div onClick={() => handleLanguageSelect('en')}>{t('english')}</div>
                            <div onClick={() => handleLanguageSelect('no')}>{t('norwegian')}</div>
                            <div onClick={() => handleLanguageSelect('bu')}>{t('burmese')}</div>
                            <div onClick={() => handleLanguageSelect('zo')}>{t('zomi')}</div>
                        </div>
                    )}
                </div>
            </div>

            <div className={`navbar-section navbar-items-product-tips-aboutus ${menuOpen ? 'open' : ''}`}>
                <div className="navbar-item" onClick={handleProductsClick}>
                    <span className="bold-text">{t('our_products')}</span>
                    <img src={downArrowIcon} alt="Dropdown" className="down-arrow-icon"/>
                    <div className={`products-dropdown ${showProductsDropdown ? 'show' : ''}`}>
                        <div className="dropdown-section">
                            <div className="dropdown-title">{t('lahphet')}</div>
                            <a href="#" className="dropdown-item">{t('yuwanah_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('mandalay_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('kalay_lahphet')}</a>
                        </div>
                        <div className="dropdown-section">
                            <div className="dropdown-title">{t('spicy_food')}</div>
                            <a href="#" className="dropdown-item">{t('yuwanah_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('mandalay_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('kalay_lahphet')}</a>
                        </div>
                        <div className="dropdown-section">
                            <div className="dropdown-title">{t('healthy_food')}</div>
                            <a href="#" className="dropdown-item">{t('yuwanah_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('mandalay_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('kalay_lahphet')}</a>
                        </div>
                        <div className="dropdown-section">
                            <div className="dropdown-title">{t('traditional_food')}</div>
                            <a href="#" className="dropdown-item">{t('yuwanah_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('mandalay_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('kalay_lahphet')}</a>
                        </div>
                    </div>
                </div>
                <a href="#" className="navbar-item">{t('tips_guides')}</a>
                <a href="#" className="navbar-item">{t('about_us')}</a>
                <a href="#" className="navbar-item profile-icon1">
                    <img src={profile} alt="Profile" className="profile-icon"/>
                    <span>{t('login')}</span>
                </a>
            </div>

            <div className="navbar-section navbar-group-4">
                <div className="navbar-item">
                    <img src={wishlist} alt="Wishlist"/>
                </div>
                <div className="navbar-item">
                    <img src={cart} alt="Cart"/>
                </div>
                <div className="navbar-item profile-ico">
                    <img src={profile} alt="Profile" className="profile-icon"/>
                    <span>{t('login')}</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
