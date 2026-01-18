export default function FeaturesSection() {
  const features = [
    {
      icon: '✓',
      title: 'Easy Organization',
      description: 'Create and organize your items into custom lists with a simple, intuitive interface.'
    },
    {
      icon: '📱',
      title: 'Access Anywhere',
      description: 'Access your lists from any device. Your data syncs automatically in real-time.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. Privacy is our top priority.'
    },
    {
      icon: '⚡',
      title: 'Fast Performance',
      description: 'Lightning-fast performance ensures you stay productive without delays.'
    },
    {
      icon: '🎯',
      title: 'Smart Categories',
      description: 'Organize items with smart categories and tags for better management.'
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: 'Track your progress with detailed analytics and insights.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600">Everything you need to stay organized and productive</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
