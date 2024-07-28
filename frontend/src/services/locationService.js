// src/services/locationService.js
import axios from 'axios';

const API_KEY = '3b4adc43bcb541d4a47cbadb2aba2aca'; // Replace with the actual API key

export const getLocation = async () => {
    try {
        const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching location data:', error);
        return null;
    }
};