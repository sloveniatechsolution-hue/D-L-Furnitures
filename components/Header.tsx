'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MegaMenu from './MegaMenu';
import { cartStore } from '@/lib/cartStore';
import { wishlistStore } from '@/lib/wishlistStore';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside and update counts
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    // Update cart and wishlist counts
    const updateCounts = () => {
      setCartCount(cartStore.getCount());
      setWishlistCount(wishlistStore.getCount());
    };
    updateCounts();

    // Listen for storage changes (in case cart/wishlist is updated from another tab)
    window.addEventListener('storage', updateCounts);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('storage', updateCounts);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Close menu and navigate to search page
      closeMegaMenu();
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const closeMegaMenu = () => {
    setActiveMenu(null);
  };

  const categories = [
    {
      name: 'Sofas',
      slug: 'sofas',
      image: '/sofa.png',
      subCategories: [
        {
          name: 'Sofa',
          items: [
            'All Sofas',
            'Fabric Sofas',
            'Wooden Sofas',
            '3 Seater Sofas',
            '2 Seater Sofas',
            '1 Seater Sofas',
            '3+1+1 Sofa Sets',
            'Sofa Cum Beds',
            'L Shaped Sofas',
            'Chaise Loungers',
            'Outdoor Sofas',
            'Diwans',
          ],
        },
        {
          name: 'Sofa Cum Bed',
          items: [
            'All Sofa Cum Beds',
            'Wooden Sofa Cum Beds',
            'Fabric Sofa Cum Beds',
          ],
        },
        {
          name: 'Recliners',
          items: [
            'All Recliners',
            '1 Seater Recliners',
            '2 Seater Recliners',
            '3 Seater Recliners',
          ],
        },
      ],
    },
    {
      name: 'Beds',
      slug: 'beds',
      image: '/bed.png',
      subCategories: [
        {
          name: 'Beds',
          items: [
            'All Beds',
            'Single Beds',
            'Double Beds',
            'Queen Beds',
            'King Beds',
            'Poster Beds',
            'Storage Beds',
          ],
        },
        {
          name: 'Bed Frames',
          items: ['Wooden Frames', 'Metal Frames', 'Upholstered Frames'],
        },
        {
          name: 'Mattresses',
          items: ['Foam Mattresses', 'Spring Mattresses', 'Memory Foam'],
        },
      ],
    },
    {
      name: 'Dining',
      slug: 'dining',
      image: '/dinning.png',
      subCategories: [
        {
          name: 'Dining Sets',
          items: [
            'All Dining Sets',
            '4 Seater Sets',
            '6 Seater Sets',
            '8 Seater Sets',
          ],
        },
        {
          name: 'Dining Tables',
          items: [
            'Wooden Tables',
            'Glass Tables',
            'Expandable Tables',
          ],
        },
        {
          name: 'Dining Chairs',
          items: [
            'Wooden Chairs',
            'Upholstered Chairs',
            'Accent Chairs',
          ],
        },
      ],
    },
    {
      name: 'Storage',
      slug: 'storage',
      image: '/storage.jpg',
      subCategories: [
        {
          name: 'Cabinets',
          items: [
            'All Cabinets',
            'Kitchen Cabinets',
            'Bedroom Cabinets',
            'Living Room Cabinets',
          ],
        },
        {
          name: 'Shelves',
          items: ['Wall Shelves', 'Bookshelf', 'Floating Shelves'],
        },
        {
          name: 'Wardrobes',
          items: ['Wooden Wardrobes', 'Sliding Wardrobes', 'Corner Wardrobes'],
        },
      ],
    },
    {
      name: 'Office',
      slug: 'office',
      image: '/office.webp',
      subCategories: [
        {
          name: 'Desks',
          items: [
            'All Desks',
            'Computer Desks',
            'Study Desks',
            'Adjustable Desks',
          ],
        },
        {
          name: 'Office Chairs',
          items: ['Executive Chairs', 'Task Chairs', 'Gaming Chairs'],
        },
        {
          name: 'Storage',
          items: ['Filing Cabinets', 'Office Shelves', 'Pedestals'],
        },
      ],
    },
    {
      name: 'Decor',
      slug: 'decor',
      image: '/decor.jpg',
      subCategories: [
        {
          name: 'Wall Decor',
          items: ['Wall Hangings', 'Mirrors', 'Paintings'],
        },
        {
          name: 'Lighting',
          items: ['Table Lamps', 'Floor Lamps', 'Pendant Lights'],
        },
        {
          name: 'Accessories',
          items: ['Cushions', 'Rugs', 'Table Decor'],
        },
      ],
    },
  ];

  return (
    <header className="w-full bg-neutral-950 border-b border-neutral-800 fixed top-0 z-40" ref={menuRef}>
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-3">
        {/* Logo & Navigation Row */}
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <Link href="/" onClick={closeMegaMenu} className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                 src="/logo.jpg"
                 alt="D&L Furnitures Logo"
                 fill
                 sizes="(max-width: 768px) 60px, 64px"
                 className="object-contain"
               />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent leading-none">
                D&L
              </h1>
              <p className="text-xs md:text-sm font-semibold text-yellow-500 mt-1">
                FURNITURES
              </p>
            </div>
          </Link>

          {/* Navigation Menu - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8 text-gray-300 font-medium text-sm relative z-40">
            {categories.map((cat) => (
              <div key={cat.slug} className="relative group">
                <button
                  onMouseEnter={() => setActiveMenu(cat.slug)}
                  onMouseLeave={() => setActiveMenu(null)}
                  className="hover:text-yellow-600 transition pb-3 pt-3 border-b-2 border-transparent hover:border-yellow-600 flex items-center gap-1"
                >
                  {cat.name}
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>

                {/* Megamenu */}
                <div
                  onMouseEnter={() => setActiveMenu(cat.slug)}
                  onMouseLeave={() => setActiveMenu(null)}
                  className="absolute top-full left-0 bg-neutral-900 border border-neutral-800 shadow-xl shadow-black/50 z-50 py-6 px-6 hidden group-hover:block w-screen max-w-5xl"
                >
                  <div className="grid grid-cols-4 gap-8">
                    {/* Category Image */}
                    <div className="h-64 rounded-lg overflow-hidden shadow-md">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Menu Items */}
                    <div className="col-span-3">
                      <div className="grid grid-cols-3 gap-8">
                        {cat.subCategories.map((subCat, idx) => (
                          <div key={idx}>
                            <h4 className="font-bold text-white mb-3 text-sm border-b-2 border-yellow-600 pb-2">
                              {subCat.name}
                            </h4>
                            <ul className="space-y-2">
                              {subCat.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link
                                    href={`/product/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    onClick={closeMegaMenu}
                                    className="text-gray-300 text-sm hover:text-yellow-600 hover:font-semibold transition"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* About Us Button */}
          <Link
            href="/about"
            onClick={closeMegaMenu}
            className="hidden sm:block px-6 py-2 mx-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-neutral-950 font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            About Us
          </Link>

          {/* Search & Icons */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-neutral-900 rounded-full px-4 py-2 w-48 lg:w-64 border border-neutral-800">
              <input
                type="text"
                placeholder="Search furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-full text-white placeholder-gray-500 font-medium"
              />
              <button type="submit" className="hover:opacity-70">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-2 hover:bg-neutral-800 rounded-full transition"
              title="Wishlist"
            >
              <svg
                className="w-6 h-6 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-neutral-800 rounded-full transition"
              title="Cart"
            >
              <svg
                className="w-6 h-6 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <nav className="md:hidden flex items-center gap-4 mt-4 text-gray-300 font-medium text-xs overflow-x-auto pb-2">
          {categories.map((cat) => (
            <div key={cat.slug} className="relative">
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === cat.slug ? null : cat.slug)
                }
                className="whitespace-nowrap hover:text-yellow-600 flex items-center gap-1"
              >
                {cat.name}
                <svg
                  className={`w-3 h-3 transition-transform ${
                    activeMenu === cat.slug ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {/* Mobile submenu */}
              {activeMenu === cat.slug && (
                <div className="absolute top-full left-0 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl shadow-black/50 p-4 mt-2 w-48 z-50">
                  {cat.subCategories.map((subCat, idx) => (
                    <div key={idx} className="mb-4">
                      <p className="font-semibold text-white text-xs mb-2">
                        {subCat.name}
                      </p>
                      <ul className="space-y-1">
                        {subCat.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              href={`/product/${item.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeMegaMenu}
                              className="text-gray-400 text-xs hover:text-yellow-600 block"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
