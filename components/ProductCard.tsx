'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/mockData';
import { cartStore } from '@/lib/cartStore';
import { wishlistStore } from '@/lib/wishlistStore';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlistStore.isInWishlist(product.id));
  }, [product.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    cartStore.addItem(product);
    setShowAddedNotification(true);
    // Trigger storage event so header updates cart count
    window.dispatchEvent(new Event('storage'));
    setTimeout(() => setShowAddedNotification(false), 2000);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      {/* Image Container */}
      <div className="relative bg-gray-100 h-64 overflow-hidden">
        <Image
           src={product.image}
           alt={product.name}
           fill
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
         />

        {/* Sale Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
            {product.badge}
          </div>
        )}

        {/* Best Seller Badge */}
        {product.isBestSeller && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
            Best Seller
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            wishlistStore.toggleWishlist(product);
            setIsInWishlist(!isInWishlist);
            window.dispatchEvent(new Event('storage'));
          }}
          className="absolute bottom-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-md"
          title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-700'
            }`}
            stroke={isInWishlist ? 'none' : 'currentColor'}
            strokeWidth={isInWishlist ? 0 : 2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition">
          {product.name}
        </h4>

        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>

        {/* Price Section */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ₹{product.mrp.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        </div>

        {/* EMI Text */}
        {product.emiText && (
          <p className="text-xs text-blue-600 font-medium mb-4">
            {product.emiText}
          </p>
        )}

        {/* Add to Cart Button */}
        <div className="relative">
          <button
            onClick={handleAddToCart}
            className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold hover:bg-yellow-700 transition"
          >
            Add to Cart
          </button>
          
          {showAddedNotification && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-green-500 text-white py-2 rounded-lg font-semibold text-center text-sm animate-pulse">
              ✓ Added to Cart
            </div>
          )}
        </div>
      </div>
      </div>
    </Link>
  );
}
