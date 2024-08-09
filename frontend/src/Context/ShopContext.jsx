// ShopContext.jsx
import React, { createContext, useState } from 'react';
import all_product from '../Components/Asset/all_product'; // Ensure the correct path to the all_product file.

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [products] = useState(all_product); // Initializing products with the data from all_product.

    return (
        <ShopContext.Provider value={{ all_product: products }}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider; // Exporting the context provider.
