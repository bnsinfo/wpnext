'use client';

import { createContext, useState, useEffect } from 'react';

export const SectorDataContext = createContext(undefined);

export const SectorDataProvider = ({ children }) => {
    const [pagesDataApi, setPagesDataApi] = useState([]);
    const [productsApi, setProductsApi] = useState(null);

    const [loading, setLoading] = useState({
        pages: true,
        products: true,
    });

    const [errors, setErrors] = useState({
        pages: null,
        products: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const consumerKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
            const consumerSecret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

            try {
                // Fetch pages and products data
                const [pagesResponse, productsResponse] = await Promise.all([
                    fetch(`${apiUrl}/wp-json/wp/v2/pages?fields=acf&acf_format=standard`),
                    fetch(
                        `${apiUrl}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
                    ),
                ]);

                // Check if responses are successful
                if (!pagesResponse.ok) throw new Error('Failed to fetch pages data');
                if (!productsResponse.ok) throw new Error('Failed to fetch products data');

                // Parse the JSON responses
                const [pagesData, productData] = await Promise.all([
                    pagesResponse.json(),
                    productsResponse.json(),
                ]);

                // Update state with fetched data
                setPagesDataApi(pagesData);
                setProductsApi(productData);

                // Update loading states
                setLoading({ pages: false, products: false });
            } catch (err) {
                // Handle errors for pages and products separately
                setErrors((prev) => ({
                    ...prev,
                    pages: err.message.includes('pages') ? err.message : prev.pages,
                    products: err.message.includes('products') ? err.message : prev.products,
                }));

                // Update loading states
                setLoading({ pages: false, products: false });
            }
        };

        fetchData();
    }, []);

    return (
        <SectorDataContext.Provider
            value={{
                pagesDataApi,
                productsApi,
                loading,
                errors,
            }}
        >
            {children}
        </SectorDataContext.Provider>
    );
};
