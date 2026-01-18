import Link from 'next/link';

export default function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: ['Up to 5 lists', 'Up to 50 items', 'Basic support', 'Web access']
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      description: 'For power users',
      features: ['Unlimited lists', 'Unlimited items', 'Priority support', 'Web & mobile access', 'Advanced analytics'],
      highlighted: true
    },
    {
      name: 'Team',
      price: '$24.99',
      period: '/month',
      description: 'For teams and organizations',
      features: ['Everything in Pro', 'Team collaboration', 'Admin controls', 'API access', '24/7 support']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Choose the plan that works best for you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-lg border-2 ${
                plan.highlighted
                  ? 'border-blue-600 bg-gradient-to-b from-blue-50 to-white shadow-lg'
                  : 'border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-gray-600">{plan.period}</span>}
              </div>
              <Link
                href="/login"
                className={`w-full block text-center py-3 rounded-lg font-semibold mb-8 transition ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-2 border-gray-300 text-gray-900 hover:border-blue-600'
                }`}
              >
                Get Started
              </Link>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <span className="text-green-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
