'use client';

import { useState } from 'react';
import OfferBar from '@/components/OfferBar';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import FilterSidebar from '@/components/FilterSidebar';
import ProductGrid from '@/components/ProductGrid';
import TrustBadges from '@/components/TrustBadges';
import Footer from '@/components/Footer';
import FeaturedCategories from '@/components/FeaturedCategories';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import SEOFooterContent from '@/components/SEOFooterContent';
import { products } from '@/lib/mockData';

export default function Home() {
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

  const filteredProducts = products.filter((product) => {
    // Price filter
    if (product.price > filters.priceRange) return false;

    // Materials filter (if any selected)
    if (filters.materials.length > 0) {
      const hasMatch = filters.materials.some(
        (material) =>
          product.name.toLowerCase().includes(material.toLowerCase())
      );
      if (!hasMatch) return false;
    }

    // Availability filter
    if (filters.availability.length > 0) {
      const inStock = product.stock !== undefined ? product.stock > 0 : true;
      if (
        filters.availability.includes('instock') &&
        !inStock
      ) {
        return false;
      }
      if (
        !filters.availability.includes('instock') &&
        inStock
      ) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="w-full bg-gray-50">
      {/* Sticky Offer Bar */}
      <OfferBar />

      {/* Header with Navigation */}
      <Header />

      {/* Hero Banner Section - Add top padding for fixed header */}
      <div>
        <HeroBanner />
      </div>

      {/* Main Content - Filters & Product Grid */}
      <section id="products-section" className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar filters={filters} setFilters={setFilters} />

          {/* Product Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </section>

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Testimonials Section */}
      <Testimonials />

      {/* SEO Footer Content */}
      <SEOFooterContent />

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Footer */}
      <Footer />
    </div>
  );
}
