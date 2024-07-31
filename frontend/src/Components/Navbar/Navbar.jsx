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

    const handleProductsMouseEnter = () => {
        setShowProductsDropdown(true);
    }
    const handleProductsMouseLeave = () => {
        setShowProductsDropdown(false)
    }
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
            <div className="navbar-menu-icon" onClick={toggleMenu}>
                <img src={menuOpen ? closeIcon : hamburgerIcon} alt="Menu Icon"/>
            </div>
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="MMFood Logo"/>
                </Link>
            </div>


            <div className="one-item">
                <div className="navbar-search">
                    <input type="text" placeholder={t('search')}/>
                </div>
            </div>


            <div className="two-items">
                <div className="navbar-item" onMouseEnter={handleCountryMouseEnter}
                     onMouseLeave={handleCountryMouseLeave}>
                    <img src={location} alt="Location" className="location-icon"/>
                    <div className="deliver-to">
                        <span className="normal-text">{t('deliver_to')}</span>
                        <span className="country bold-text">{country}</span>
                        <img src={downArrowIcon} alt="Dropdown" className="down-arrow-icon"/>
                    </div>
                    {showCountryDropdown && (
                        <div className="dropdown">
                            <div onClick={() => handleCountrySelect('Norway')}>Norway</div>
                            <div onClick={() => handleCountrySelect('Sweden')}>Sweden</div>
                            <div onClick={() => handleCountrySelect('Denmark')}>Denmark</div>
                            <div onClick={() => handleCountrySelect('Finland')}>Finland</div>
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
                        <div className="dropdown">
                            <div onClick={() => handleLanguageSelect('en')}>English</div>
                            <div onClick={() => handleLanguageSelect('no')}>Norwegian</div>
                            <div onClick={() => handleLanguageSelect('bu')}>Burmese</div>
                            <div onClick={() => handleLanguageSelect('zo')}>Zomi</div>
                        </div>
                    )}
                </div>
            </div>
            <div className={`navbar-items ${menuOpen ? 'open' : ''}`}>
                <div className="navbar-item" onMouseEnter={handleProductsMouseEnter}
                     onMouseLeave={handleProductsMouseLeave}>
                    <span className="bold-text">{t('our_products')}</span>
                    <img src={downArrowIcon} alt="Dropdown" className="down-arrow-icon"/>
                    {showProductsDropdown && (
                        <div className="products-dropdown">
                            <div className="dropdown-section">
                                <div className="dropdown-title">Lahphet</div>
                                <a href="#" className="dropdown-item">Yuwanah lahphet</a>
                                <a href="#" className="dropdown-item">Mandalay lahphet</a>
                                <a href="#" className="dropdown-item">Kalay lahphet</a>
                            </div>
                            <div className="dropdown-section">
                                <div className="dropdown-title">Spicy Food</div>
                                <a href="#" className="dropdown-item">Yuwanah lahphet</a>
                                <a href="#" className="dropdown-item">Mandalay lahphet</a>
                                <a href="#" className="dropdown-item">Kalay lahphet</a>
                            </div>
                            <div className="dropdown-section">
                                <div className="dropdown-title">Healthy Food</div>
                                <a href="#" className="dropdown-item">Yuwanah lahphet</a>
                                <a href="#" className="dropdown-item">Mandalay lahphet</a>
                                <a href="#" className="dropdown-item">Kalay lahphet</a>
                            </div>
                            <div className="dropdown-section">
                                <div className="dropdown-title">Traditional Food</div>
                                <a href="#" className="dropdown-item">Yuwanah lahphet</a>
                                <a href="#" className="dropdown-item">Mandalay lahphet</a>
                                <a href="#" className="dropdown-item">Kalay lahphet</a>
                            </div>
                        </div>
                    )}
                </div>
                <a href="#" className="navbar-item">{t('tips_guides')}</a>
                <a href="#" className="navbar-item">{t('about_us')}</a>
            </div>


            <div className="three-icon">
                <div className="navbar-icons">
                    <a href="#" className="icon">
                        <img src={wishlist} alt="Wishlist"/>
                    </a>
                </div>
                <div className="navbar-icons">
                    <a href="#" className="icon">
                        <img src={cart} alt="Cart"/>
                    </a>
                </div>
                <div className="navbar-icons">
                    <a href="#" className="icon">
                        <img src={profile} alt="Profile"/>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
