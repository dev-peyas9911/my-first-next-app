import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getItem(id) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/items/${id}`,
      { cache: 'no-store' }
    );
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching item:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const item = await getItem(params.id);
  if (!item) {
    return { title: 'Product Not Found' };
  }
  return {
    title: item.name,
    description: item.description
  };
}

export default async function ItemDetailsPage({ params }) {
  const item = await getItem(params.id);

  if (!item) {
    notFound();
  }

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
        {/* Breadcrumb */}
        <div className="flex gap-2 items-center text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{item.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category Badge */}
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              {item.category}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{item.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-yellow-400 text-2xl">
                {'⭐'.repeat(Math.floor(item.rating))}
              </div>
              <span className="text-lg text-gray-700">
                {item.rating} out of 5
              </span>
              <span className="text-gray-600">
                ({item.reviews} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                ${item.price}
              </div>
              <p className="text-gray-600">
                {item.inStock ? (
                  <span className="text-green-600 font-semibold">✓ In Stock</span>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              {item.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <span className="text-green-600 text-xl">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart Button */}
            <button
              disabled={!item.inStock}
              className={`w-full py-4 rounded-lg font-bold text-lg transition mb-4 ${
                item.inStock
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              {item.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Back to Products */}
            <Link
              href="/products"
              className="w-full block text-center py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition font-semibold"
            >
              ← Back to Products
            </Link>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(item.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-gray-200 pb-4">
                <span className="text-gray-700 font-semibold">{key}</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
            <p className="text-gray-700 mb-4">Check out other products in the {item.category} category</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
