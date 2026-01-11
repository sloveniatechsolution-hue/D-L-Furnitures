'use client';

import { useState, useMemo, use } from 'react';
import Header from '@/components/Header';
import OfferBar from '@/components/OfferBar';
import FilterSidebar from '@/components/FilterSidebar';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';
import { products } from '@/lib/mockData';

const categoryNames: Record<string, string> = {
  sofas: 'Sofas',
  beds: 'Beds',
  'dining-sets': 'Dining Sets',
  storage: 'Storage',
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [filters, setFilters] = useState<{
    priceRange: number;
    materials: string[];
    finishes: string[];
    seatingCapacity: string[];
    availability: string[];
    deliveryTime: string[];
  }>({
    priceRange: 100000,
    materials: [],
    finishes: [],
    seatingCapacity: [],
    availability: ['instock'],
    deliveryTime: [],
  });

  const categoryProducts = useMemo(() => {
    return products.filter((product) => product.category === slug);
  }, [slug]);

  const filteredProducts = categoryProducts.filter((product) => {
    if (product.price > filters.priceRange) return false;
    if (filters.materials.length > 0) {
      const hasMatch = filters.materials.some(
        (material) =>
          product.name.toLowerCase().includes(material.toLowerCase())
      );
      if (!hasMatch) return false;
    }
    if (filters.availability.length > 0) {
      const inStock = product.stock !== undefined ? product.stock > 0 : true;
      if (filters.availability.includes('instock') && !inStock) return false;
      if (!filters.availability.includes('instock') && inStock) return false;
    }
    return true;
  });

  const categoryName = categoryNames[slug] || 'Products';

  return (
    <div className="w-full bg-gray-50">
      <OfferBar />
      <Header />

      {/* Category Header */}
      <section className="w-full bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            {categoryName}
          </h1>
          <p className="text-lg text-gray-600">
            Browse our collection of premium {categoryName.toLowerCase()}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Showing {filteredProducts.length} products
          </p>
        </div>
      </section>

      {/* Main Content - Filters & Product Grid */}
      <section className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar filters={filters} setFilters={setFilters} />

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="flex-1 flex items-center justify-center min-h-96">
              <div className="text-center">
                <p className="text-xl text-gray-600">
                  No products found with the selected filters.
                </p>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Footer */}
      <Footer />
    </div>
  );
}
