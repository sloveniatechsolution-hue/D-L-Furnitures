'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import OfferBar from '@/components/OfferBar';
import Footer from '@/components/Footer';
import { wishlistStore } from '@/lib/wishlistStore';
import { cartStore } from '@/lib/cartStore';
import StarRating from '@/components/StarRating';
import { Product } from '@/lib/mockData';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const items = wishlistStore.getWishlist();
    setWishlistItems(items);
    setIsLoading(false);

    const handleStorageChange = () => {
      const updatedItems = wishlistStore.getWishlist();
      setWishlistItems(updatedItems);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleRemoveFromWishlist = (productId: number) => {
    wishlistStore.removeItem(productId);
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddToCart = (product: Product) => {
    cartStore.addItem(product);
    window.dispatchEvent(new Event('storage'));
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <OfferBar />
        <Header />
        <main className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="text-gray-500">Loading wishlist...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full">
      <OfferBar />
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-500">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">My Wishlist</span>
          </div>

          {wishlistItems.length === 0 ? (
            // Empty Wishlist
            <div className="bg-white rounded-lg p-12 text-center">
              <svg
                className="w-24 h-24 mx-auto text-gray-300 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Wishlist is Empty
              </h1>
              <p className="text-gray-600 mb-8">
                Save your favorite products to your wishlist
              </p>
              <Link
                href="/"
                className="inline-block bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            // Wishlist Items
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                My Wishlist ({wishlistItems.length} items)
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistItems.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition"
                  >
                    {/* Product Image */}
                    <Link href={`/product/${product.id}`}>
                      <div className="relative w-full h-48 bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-contain"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-4">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-yellow-500">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="mb-3">
                        <StarRating rating={product.rating} reviews={product.reviews} />
                      </div>

                      {/* Price */}
                      <div className="mb-4 flex items-center gap-2">
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

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-yellow-600 text-white py-2 rounded-lg font-semibold hover:bg-yellow-700 transition text-sm"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleRemoveFromWishlist(product.id)}
                          className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-100 transition text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
