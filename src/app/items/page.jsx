'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';

export default function ItemsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/items');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }
  const [items, setItems] = useState([
    { id: 1, title: 'Learn Next.js', completed: false, list: 'Learning' },
    { id: 2, title: 'Build a project', completed: false, list: 'Learning' },
    { id: 3, title: 'Buy groceries', completed: true, list: 'Shopping' }
  ]);
  const [newItem, setNewItem] = useState('');
  const [newList, setNewList] = useState('Personal');

  const lists = ['Personal', 'Shopping', 'Learning', 'Work'];

  const addItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      setItems([...items, {
        id: Math.max(...items.map(i => i.id), 0) + 1,
        title: newItem,
        completed: false,
        list: newList
      }]);
      setNewItem('');
    }
  };

  const toggleComplete = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MyApp
          </Link>
          <div className="flex gap-4 items-center">
            <span className="text-gray-700">Welcome, {session?.user?.name || session?.user?.email}!</span>
            <button
              onClick={() => window.location.href = '/api/auth/signout'}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Lists & Items</h1>
            <p className="text-gray-600">Organize and manage your items across different lists</p>
          </div>
          <Link
            href="/items/add"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            + Add New Item
          </Link>
        </div>

        {/* Add New Item Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Item</h2>
          <form onSubmit={addItem} className="flex gap-3 flex-wrap">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter item name..."
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <select
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {lists.map(list => (
                <option key={list} value={list}>{list}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Add Item
            </button>
          </form>
        </div>

        {/* Items by List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {lists.map(list => {
            const listItems = items.filter(item => item.list === list);
            return (
              <div key={list} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{list}</h3>
                {listItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No items in this list</p>
                ) : (
                  <ul className="space-y-2">
                    {listItems.map(item => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleComplete(item.id)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 cursor-pointer"
                        />
                        <span
                          className={`flex-1 ${
                            item.completed ? 'line-through text-gray-400' : 'text-gray-900'
                          }`}
                        >
                          {item.title}
                        </span>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-red-600 hover:text-red-700 font-semibold text-sm"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Total Items</p>
            <p className="text-3xl font-bold text-blue-600">{items.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">{items.filter(i => i.completed).length}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-orange-600">{items.filter(i => !i.completed).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
