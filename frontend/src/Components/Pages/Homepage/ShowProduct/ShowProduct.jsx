import React, { useState } from 'react';
import './ShowProduct.css';
import largephoto1 from "../../../Assets/largephoto.png";
import largephoto2 from "../../../Assets/largephoto2.png";
import largephoto3 from "../../../Assets/largephoto3.png";
import greaterthan from "../../../Assets/greaterthan.png";
import lessthan from "../../../Assets/lessthan.png";

const ShowProduct = () => {
    const photos = [largephoto1, largephoto2, largephoto3];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };

    return (
        <div className="show-product">
            <button className="nav-button left" onClick={handlePrev}>
                <img src={lessthan} alt="Previous" className="nav-icon" />
            </button>
            <img src={photos[currentIndex]} alt="Large Product" className="large-photo" />
            <button className="nav-button right" onClick={handleNext}>
                <img src={greaterthan} alt="Next" className="nav-icon" />
            </button>
        </div>
    );
};

export default ShowProduct;
