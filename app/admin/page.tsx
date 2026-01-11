'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple admin login - demo credentials
    if (email === 'admin@danl.com' && password === 'admin123') {
      localStorage.setItem('adminToken', 'authenticated');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use admin@danl.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-neutral-950 to-neutral-900 flex items-center justify-center p-4">
      <div className="bg-neutral-800 rounded-lg shadow-lg p-8 max-w-md w-full text-white">
        <h1 className="text-3xl font-bold text-center text-yellow-500 mb-2">
          D&L Admin
        </h1>
        <p className="text-center text-neutral-400 mb-8">Login to manage products</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-neutral-300 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 bg-neutral-700 text-white"
              placeholder="admin@danl.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-neutral-300 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 bg-neutral-700 text-white"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold hover:bg-yellow-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-neutral-400 text-sm mt-6">
          Demo Credentials:<br />
          Email: admin@danl.com<br />
          Password: admin123
        </p>
      </div>
    </div>
  );
}
