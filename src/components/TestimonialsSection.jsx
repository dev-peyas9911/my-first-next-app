export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      image: '👩‍💼',
      quote: 'MyApp has completely transformed how I manage my team\'s tasks. It\'s simple, powerful, and reliable.'
    },
    {
      name: 'Mike Chen',
      role: 'Entrepreneur',
      image: '👨‍💼',
      quote: 'I\'ve tried many list apps, but MyApp is by far the best. The UI is clean and the functionality is top-notch.'
    },
    {
      name: 'Emma Williams',
      role: 'Student',
      image: '👩‍🎓',
      quote: 'As a busy student, MyApp helps me stay organized with my assignments and deadlines. Highly recommended!'
    },
    {
      name: 'David Brown',
      role: 'Freelancer',
      image: '👨‍💻',
      quote: 'Managing multiple projects is now a breeze with MyApp. I can\'t imagine working without it anymore.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600">Trusted by thousands of users worldwide</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-5xl mb-4">{testimonial.image}</div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
              <div className="flex text-yellow-400 mt-3">
                {'⭐'.repeat(5)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
