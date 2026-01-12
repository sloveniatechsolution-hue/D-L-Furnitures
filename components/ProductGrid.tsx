'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/mockData';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [sortBy, setSortBy] = useState('relevance');

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-low-high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => b.id - a.id);
      case 'best-sellers':
        return sorted.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      default:
        return sorted;
    }
  }, [products, sortBy]);

  return (
    <div className="flex-1">
      {/* Grid Title & Sort */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Products ({products.length})
        </h3>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 cursor-pointer"
        >
          <option value="relevance">Sort by: Relevance</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="newest">Newest</option>
          <option value="best-sellers">Best Sellers</option>
        </select>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
