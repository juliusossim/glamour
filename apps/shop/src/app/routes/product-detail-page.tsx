/**
 * Product Detail Page Component
 *
 * Uses data router loader data for product details.
 * Uses Tailwind CSS for styling.
 */

import {
    useRouteNavigation,
    type ProductDetailLoaderData,
} from '@org/shop-data';
import { useFetcher, useLoaderData } from 'react-router-dom';

export function ProductDetailPage() {
  const { product } = useLoaderData() as ProductDetailLoaderData;
  const { back } = useRouteNavigation();
  const fetcher = useFetcher();

  const isAddingToCart = fetcher.state === 'submitting';

  const handleBackClick = () => {
    back();
  };

  const handleAddToCart = () => {
    fetcher.submit({ productId: product.id, quantity: '1' }, { method: 'post' });
  };

  const getStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < Math.floor(product.rating));
    }
    return stars;
  };

  const getButtonText = () => {
    if (isAddingToCart) return 'Adding...';
    if (!product.inStock) return 'Out of Stock';
    return 'Add to Cart';
  };

  return (
    <div className="w-full">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="mb-6 flex items-center gap-2 border-0 bg-transparent p-2 text-base text-indigo-500 hover:underline"
      >
        ← Back to Products
      </button>

      {/* Product Detail Card */}
      <div className="grid gap-6 rounded-2xl bg-white p-4 shadow-md md:grid-cols-2 md:gap-12 md:p-8">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="block h-auto w-full"
          />
          {!product.inStock && (
            <div className="absolute right-4 top-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white">
              Out of Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          {/* Category */}
          <div className="text-sm font-medium uppercase tracking-wide text-indigo-500">
            {product.category}
          </div>

          {/* Name */}
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-xl text-slate-200">
              {getStars().map((filled, idx) => (
                <span
                  key={`star-${idx}`}
                  className={filled ? 'text-orange-400' : ''}
                >
                  ★
                </span>
              ))}
            </span>
            <span className="text-sm text-slate-500">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-indigo-500 md:text-3xl">
            ${product.price.toFixed(2)}
          </div>

          {/* Description */}
          <p className="leading-relaxed text-slate-600">{product.description}</p>

          {/* Meta Info */}
          <div className="flex flex-col gap-2 rounded-lg bg-slate-50 p-4">
            <div className="flex gap-2">
              <span className="text-sm text-slate-500">Product ID:</span>
              <span className="text-sm font-medium text-slate-900">
                {product.id}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-sm text-slate-500">Availability:</span>
              <span
                className={`text-sm font-medium ${
                  product.inStock ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
              className="w-full rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {getButtonText()}
            </button>
          </div>

          {/* Success Message */}
          {fetcher.data?.success && (
            <div className="mt-4 rounded-lg bg-green-100 px-4 py-3 text-center text-sm text-green-700">
              Added to cart successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
