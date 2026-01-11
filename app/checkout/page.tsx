'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cartStore, CartItem } from '@/lib/cartStore';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const items = cartStore.getCart();
    setCartItems(items);
    setTotal(cartStore.getTotal());
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode ||
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv
    ) {
      alert('Please fill in all fields');
      return;
    }

    // Process order
    setOrderPlaced(true);
    cartStore.clearCart();
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add items to your cart to proceed with checkout
          </p>
          <Link
            href="/"
            className="inline-block bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-12 max-w-md w-full text-center">
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-2">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Order ID: #{Math.floor(Math.random() * 1000000)}
          </p>
          <p className="text-gray-600 mb-8">
            We will send you an email confirmation with tracking details shortly.
          </p>
          <div className="mb-8 p-4 bg-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-300">
              Total Amount: <span className="font-bold text-yellow-500">₹{total.toLocaleString()}</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Estimated Delivery: 5-7 Business Days
            </p>
          </div>
          <Link
            href="/"
            className="w-full inline-block bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-yellow-500">
            Home
          </Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-yellow-500">
            Cart
          </Link>
          <span>/</span>
          <span>Checkout</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Address Section */}
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="e.g., Rajesh"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="col-span-1 w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 bg-white text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="e.g., Kumar"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="col-span-1 w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 bg-white text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g., rajesh.kumar@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 bg-white text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g., 9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 bg-white text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="e.g., 123 Main Street, Apartment 4B"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 bg-white text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g., Mumbai"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 bg-white text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="e.g., Maharashtra"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 bg-white text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="e.g., 400001"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 bg-white text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Details
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="e.g., 4532123456789012 (16 digits)"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength={16}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 bg-white text-gray-900 placeholder-gray-400"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter your 16-digit credit/debit card number</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="e.g., 12/25"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      maxLength={5}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 bg-white text-gray-900 placeholder-gray-400"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">MM/YY format</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="e.g., 123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength={4}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 bg-white text-gray-900 placeholder-gray-400"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">3-4 digit security code</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-yellow-700 transition"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-semibold">₹0</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-900">Total</span>
                  <span className="font-bold text-2xl text-yellow-500">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-sm text-gray-700">
                <p className="mb-2">✓ Secure payment with SSL encryption</p>
                <p className="mb-2">✓ 30-day money-back guarantee</p>
                <p>✓ Free returns within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
