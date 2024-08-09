import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from 'react-router-dom';
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

const Navbar = memo(({ wishlistCount, basketCount }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
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
        if (!menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const handleItemClick = () => {
        setShowCountryDropdown(false);
        setShowLanguageDropdown(false);
        setShowProductsDropdown(false);
        setMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <nav className="navbar" aria-label="Main Navigation">
            <div className="navbar-section navbar-group-1">
                <div className="navbar-menu-icon" onClick={toggleMenu} role="button" aria-label="Toggle Menu">
                    <img src={menuOpen ? closeIcon : hamburgerIcon} alt="Menu Icon"/>
                </div>
                <div className="navbar-logo">
                    <Link style={{textDecoration: 'none'}} to="/">
                        <img src={logo} alt="MMFood Logo"/>
                    </Link>
                </div>
                <div className="navbar-section navbar-wishlist-cart1">
                    <Link style={{textDecoration: 'none'}} to='/wishlist'>
                        <div className="navbar-item wishlist-cart">
                            <img src={wishlist} alt="Wishlist"/>
                            {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
                        </div>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to='/cart'>
                        <div className="navbar-item wishlist-cart">
                            <img src={cart} alt="Cart"/>
                            {basketCount > 0 && <span className="basket-count">{basketCount}</span>}
                        </div>
                    </Link>
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
                        <div className="dropdown-location-language" role="menu" aria-label="Country Selector">
                            <div onClick={() => handleCountrySelect('Norway')} role="menuitem">{t('norway')}</div>
                            <div onClick={() => handleCountrySelect('Sweden')} role="menuitem">{t('sweden')}</div>
                            <div onClick={() => handleCountrySelect('Denmark')} role="menuitem">{t('denmark')}</div>
                            <div onClick={() => handleCountrySelect('Finland')} role="menuitem">{t('finland')}</div>
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
                        <div className="dropdown-location-language" role="menu" aria-label="Language Selector">
                            <div onClick={() => handleLanguageSelect('en')} role="menuitem">{t('english')}</div>
                            <div onClick={() => handleLanguageSelect('no')} role="menuitem">{t('norwegian')}</div>
                            <div onClick={() => handleLanguageSelect('bu')} role="menuitem">{t('burmese')}</div>
                            <div onClick={() => handleLanguageSelect('zo')} role="menuitem">{t('zomi')}</div>
                        </div>
                    )}
                </div>
            </div>

            <div className={`navbar-section navbar-items-product-tips-aboutus ${menuOpen ? 'open' : ''}`}>
                <div className="navbar-item" onClick={handleProductsClick}>
                    <span className="bold-text">{t('our_products')}</span>
                    <img src={downArrowIcon} alt="Dropdown" className="down-arrow-icon"/>
                    <div className={`products-dropdown ${showProductsDropdown ? 'show' : ''}`}>
                        <div onClick={handleItemClick} className="dropdown-section">
                            <Link style={{textDecoration: 'none'}} to='/seafoods'>
                                <div className="dropdown-title">{t('sea_food')}</div></Link>
                            <a href="#" className="dropdown-item">{t('yuwanah_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('mandalay_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('kalay_lahphet')}</a>
                        </div>
                        <div onClick={handleItemClick} className="dropdown-section">
                            <Link style={{textDecoration: 'none'}} to='/farmfoods'>
                                <div className="dropdown-title">{t('farm_food')}</div></Link>
                            <a href="#" className="dropdown-item">{t('yuwanah_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('mandalay_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('kalay_lahphet')}</a>
                        </div>
                        <div onClick={handleItemClick} className="dropdown-section">
                            <Link style={{textDecoration: 'none'}} to='/traditionalfoods'>
                                <div className="dropdown-title">{t('traditional_food')}</div></Link>
                            <a href="#" className="dropdown-item">{t('yuwanah_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('mandalay_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('kalay_lahphet')}</a>
                        </div>
                        <div onClick={handleItemClick} className="dropdown-section">
                            <Link style={{textDecoration: 'none'}} to='/snackfoods'>
                                <div className="dropdown-title">{t('snack_food')}</div></Link>
                            <a href="#" className="dropdown-item">{t('yuwanah_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('mandalay_lahphet')}</a>
                            <a href="#" className="dropdown-item">{t('kalay_lahphet')}</a>
                        </div>
                    </div>
                </div>
                <a href="#" className="navbar-item">{t('tips_guides')}</a>
                <a href="#" className="navbar-item">{t('about_us')}</a>
                <div onClick={handleItemClick} className="navbar-item profile-icon1">
                    <Link style={{textDecoration: 'none'}} to='/login-signup'>
                        <img src={profile} alt="Profile" className="profile-icon"/>
                        <span>{t('login')}</span>
                    </Link>
                </div>
            </div>

            <div className="navbar-section navbar-group-4">
                <div className="navbar-item">
                    <Link style={{textDecoration: 'none'}} to='/wishlist'>
                        <img src={wishlist} alt="Wishlist"/>
                        {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
                    </Link>
                </div>
                <div className="navbar-item">
                    <Link style={{textDecoration: 'none'}} to='/cart'>
                        <img src={cart} alt="Cart"/>
                        {basketCount > 0 && <span className="basket-count">{basketCount}</span>}
                    </Link>
                </div>
                <div onClick={handleItemClick} className="navbar-item profile-ico">
                    <Link style={{textDecoration: 'none'}} to='/login-signup'>
                        <img src={profile} alt="Profile" className="profile-icon"/>
                        <span>{t('login')}</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
});

Navbar.propTypes = {
    wishlistCount: PropTypes.number.isRequired,
    basketCount: PropTypes.number.isRequired,
};

export default Navbar;
