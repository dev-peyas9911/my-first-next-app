export default function BenefitsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose MyApp?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <span className="text-gray-700"><strong>100% Free to Start</strong> - No credit card required to begin organizing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <span className="text-gray-700"><strong>Simple & Intuitive</strong> - Designed for ease of use from day one</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <span className="text-gray-700"><strong>Cross-Platform</strong> - Works seamlessly on web, mobile, and tablet</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <span className="text-gray-700"><strong>24/7 Support</strong> - Our team is always here to help</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <span className="text-gray-700"><strong>Regular Updates</strong> - New features added constantly</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-600 text-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Join Thousands of Users</h3>
            <div className="space-y-4 mb-8">
              <div className="text-center">
                <p className="text-4xl font-bold">10,000+</p>
                <p className="text-blue-100">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">50,000+</p>
                <p className="text-blue-100">Lists Created</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">100,000+</p>
                <p className="text-blue-100">Items Managed</p>
              </div>
            </div>
            <p className="text-blue-100">Start organizing your life today and join our growing community!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
