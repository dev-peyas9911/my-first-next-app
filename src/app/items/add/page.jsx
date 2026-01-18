'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/components/ToastProvider';

export default function AddItemPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    image: ''
  });

  // Redirect to login if not authenticated
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You must be logged in to add items.</p>
          <Link
            href="/login?callbackUrl=/items/add"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/items/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add item');
      }

      addToast('Item added successfully!', 'success', 3000);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Electronics',
        image: ''
      });

      // Redirect to items page after short delay
      setTimeout(() => {
        router.push('/items');
      }, 1500);
    } catch (error) {
      addToast(error.message || 'Failed to add item', 'error', 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MyApp
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/items" className="text-gray-600 hover:text-blue-600 transition">
              My Items
            </Link>
            <div className="relative group">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                {session?.user?.name || session?.user?.email}
              </button>
              <div className="hidden group-hover:block absolute right-0 mt-0 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => window.location.href = '/api/auth/signout'}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-8">
          <Link href="/items" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Items
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Item</h1>
          <p className="text-gray-600">Create a new product listing in our catalog</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Premium Wireless Headphones"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
                disabled={loading}
              />
            </div>

            {/* Description Input */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item in detail..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                required
                disabled={loading}
              />
            </div>

            {/* Price and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Input */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="99.99"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                  disabled={loading}
                />
              </div>

              {/* Category Select */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  disabled={loading}
                >
                  <option>Electronics</option>
                  <option>Computing</option>
                  <option>Storage</option>
                  <option>Accessories</option>
                  <option>Display</option>
                </select>
              </div>
            </div>

            {/* Image URL Input */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL (Optional)
              </label>
              <input
                id="image"
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">Leave blank for default image</p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding Item...' : 'Add Item'}
              </button>
              <Link
                href="/items"
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-gray-400 transition font-semibold text-center"
              >
                Cancel
              </Link>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> In a production environment, this form would save data to a real database. Currently, items are stored in the session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
