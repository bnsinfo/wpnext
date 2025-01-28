'use client';
import { useContext } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import Link from 'next/link'; // Import Link from next.js

const Products = () => {
    const { productsApi } = useContext(SectorDataContext);

    if (!productsApi) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-medium text-gray-500">Loading products...</p>
            </div>
        );
    }

    // No products found
    if (productsApi.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-medium text-gray-500">No products found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productsApi.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`} // Dynamic link to product details page
                        passHref
                    >
                        <div
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer"
                        >
                            {/* Featured Image */}
                            {product.images?.[0]?.src && (
                                <img
                                    src={product.images[0].src}
                                    alt={product.name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                            )}

                            {/* Product Name */}
                            <h2 className="text-lg font-semibold mb-2">
                                {product.name}
                            </h2>

                            {/* Price */}
                            {product.price && (
                                <p className="text-sm font-medium text-green-600 mb-2">
                                    Price: ₹{product.price}
                                </p>
                            )}

                            {/* Categories */}
                            {product.categories?.length > 0 && (
                                <p className="text-sm text-gray-600 mb-2">
                                    Category: {product.categories.map((cat) => cat.name).join(', ')}
                                </p>
                            )}

                            {product.short_description && (
                                <p
                                    className="text-sm text-gray-500"
                                    dangerouslySetInnerHTML={{ __html: product.short_description }}
                                ></p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Products;
