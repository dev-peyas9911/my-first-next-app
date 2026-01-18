'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Is MyApp really free?',
      answer: 'Yes! MyApp has a free plan that includes up to 5 lists and 50 items. Upgrade to Pro or Team for unlimited access.'
    },
    {
      question: 'Can I use MyApp offline?',
      answer: 'Currently, MyApp requires an internet connection. However, we\'re working on offline functionality for future releases.'
    },
    {
      question: 'How is my data secured?',
      answer: 'All your data is encrypted using industry-standard encryption (SSL/TLS). We also perform regular security audits.'
    },
    {
      question: 'Can I collaborate with team members?',
      answer: 'Yes! With the Team plan, you can invite team members, assign tasks, and collaborate in real-time.'
    },
    {
      question: 'How do I export my data?',
      answer: 'You can export your lists and items as CSV or JSON files from your account settings at any time.'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'We have a responsive web app that works great on mobile. Native apps for iOS and Android are coming soon!'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Find answers to common questions about MyApp</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                <span className={`text-2xl text-blue-600 transition ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
