import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Organized?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of users who are already using MyApp to organize their lives. Start for free today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/items"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition text-lg font-semibold"
          >
            Start Free Trial
          </Link>
          <Link
            href="/login"
            className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition text-lg font-semibold"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
