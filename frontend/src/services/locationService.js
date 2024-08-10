// src/services/locationService.js
import axios from 'axios';

const API_KEY = '31bb46885d90480f83233d6e1fdf9a30'; // Replace with the actual API key

export const getLocation = async () => {
    const cachedLocation = localStorage.getItem('locationData');
    if (cachedLocation) {
        return JSON.parse(cachedLocation);
    }

    try {
        const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`);
        localStorage.setItem('locationData', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error('Error fetching location data:', error);
        return null;
    }
};
