import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Organize Your Life with Ease
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create, manage, and organize your lists and items in one powerful platform. Stay productive and never miss a thing.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/items" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold">
            Get Started
          </Link>
          <Link href="#features" className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition text-lg font-semibold">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
