import React, { useState, useEffect } from 'react';
import './ShowProduct.css';
import largephoto1 from "../../../Assets/coverphoto1.png";
import largephoto2 from "../../../Assets/coverphoto2.png";
import largephoto3 from "../../../Assets/coverphoto3.png";
import greaterthan from "../../../Assets/greaterthan.png";
import lessthan from "../../../Assets/lessthan.png";

const ShowProduct = () => {
    const photos = [largephoto1, largephoto2, largephoto3];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        if (autoPlay) {
            const interval = setInterval(() => {
                handlePrev(); // Switches photo from left to right
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [autoPlay, currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
        setAutoPlay(false); // Stop auto-play when a thumbnail is clicked
    };

    return (
        <div className="show-product">
            <button
                className="nav-button left"
                onClick={handlePrev}
                aria-label="Previous Image"
            >
                <img src={lessthan} alt="Previous" className="nav-icon" />
            </button>
            <img
                src={photos[currentIndex]}
                alt={`Product ${currentIndex + 1}`}
                className="large-photo"
            />
            <button
                className="nav-button right"
                onClick={handleNext}
                aria-label="Next Image"
            >
                <img src={greaterthan} alt="Next" className="nav-icon" />
            </button>
            <div className="thumbnails">
                {photos.map((photo, index) => (
                    <img
                        key={index}
                        src={photo}
                        alt={`Thumbnail ${index + 1}`}
                        className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShowProduct;
