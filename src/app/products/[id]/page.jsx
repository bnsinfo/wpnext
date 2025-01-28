'use client';
import { useContext, useEffect, useState } from 'react';
import { SectorDataContext } from '@/context/apiContext';

const Page = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the full URL and extract the productId from the URL path (e.g., /products/62)
  const fullUrl = window.location.href;
  const match = fullUrl.match(/\/products\/(\d+)$/);
  const productId = match ? match[1] : null;

  const { productsApi } = useContext(SectorDataContext);

  // Fetch the product based on productId when productsApi is available
  useEffect(() => {
    if (productsApi && productId) {
      const foundProduct = productsApi.find((product) => product.id === parseInt(productId));
      if (foundProduct) {
        setProduct(foundProduct);
        setLoading(false);
      } else {
        setLoading(false); // Product not found
      }
    }
  }, [productsApi, productId]);

  // Auto-refresh every 2 seconds if still loading
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        console.log('Refreshing product data...');
        window.location.reload(); // Force page reload
      }, 1000);

      // Clear interval when loading is false
      return () => clearInterval(interval);
    }
  }, [loading]);

  // If still loading or product not found
  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (!product) return <div className="text-center text-gray-500">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Product Image */}
      {product.images && product.images.length > 0 && (
        <div className="mb-6">
          <img
            src={product.images[0].src} // Assuming the first image is the featured image
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      )}

      {/* Product Information */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Product ID: {productId}</h2>
      <h3 className="text-3xl font-semibold text-gray-800 mb-4">{product.name}</h3>
      <p className="text-lg text-gray-600 mb-4">{product.description || 'No description available.'}</p>

      {/* Price and Availability */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-bold text-green-600">₹{product.price}</span>
        <span className={`px-4 py-2 text-white rounded-full ${product.stock_status === 'instock' ? 'bg-green-500' : 'bg-red-500'}`}>
          {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Product Details */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-2">Product Details:</h4>
        <ul className="list-disc pl-6 text-gray-600">
          {product.categories && product.categories.length > 0 && (
            <li><strong>Categories:</strong> {product.categories.map((cat) => cat.name).join(', ')}</li>
          )}
          {product.sku && <li><strong>SKU:</strong> {product.sku}</li>}
        </ul>
      </div>
    </div>
  );
};

export default Page;
