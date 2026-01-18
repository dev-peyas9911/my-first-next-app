'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MyApp
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
            Home
          </Link>
          {session && (
            <Link href="/items" className="text-gray-600 hover:text-blue-600 transition">
              Items/Lists
            </Link>
          )}
          {session ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                {session.user?.name || session.user?.email}
                <span className="text-lg">▼</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    href="/items"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    My Lists
                  </Link>
                  <button
                    onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
