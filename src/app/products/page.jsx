import Link from 'next/link';
import Image from 'next/image';

async function getItems() {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/items`,
      { cache: 'no-store' }
    );
    if (!response.ok) throw new Error('Failed to fetch items');
    return response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
}

export default async function ItemsListPage() {
  const items = await getItems();

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
            <Link href="/products" className="text-gray-600 hover:text-blue-600 transition">
              Products
            </Link>
            <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600">Browse our collection of high-quality electronics and accessories</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            All Products
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 transition">
            Electronics
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 transition">
            Computing
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 transition">
            Accessories
          </button>
        </div>

        {/* Items Grid */}
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No items available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden group"
              >
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {item.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {'⭐'.repeat(Math.floor(item.rating))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {item.rating} ({item.reviews} reviews)
                    </span>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ${item.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className={`px-4 py-2 rounded-lg transition font-semibold ${
                        item.inStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      }`}
                      disabled={!item.inStock}
                    >
                      {item.inStock ? 'View Details' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
