// Mock database of items
const items = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 129.99,
    rating: 4.5,
    reviews: 342,
    description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    specs: {
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 Ohms',
      'Driver Size': '40mm',
      'Weight': '250g'
    },
    inStock: true,
    features: [
      'Active Noise Cancellation',
      'Bluetooth 5.0',
      'Touch Controls',
      'Foldable Design',
      '30-Hour Battery'
    ]
  },
  {
    id: 2,
    name: '4K Webcam',
    category: 'Electronics',
    price: 199.99,
    rating: 4.7,
    reviews: 156,
    description: 'Professional 4K webcam perfect for streaming and video calls with auto-focus technology.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    specs: {
      'Resolution': '4K (2160p)',
      'Frame Rate': '30 FPS',
      'Field of View': '85 degrees',
      'Microphone': 'Built-in Dual Mic'
    },
    inStock: true,
    features: [
      'Auto-Focus',
      'Wide Angle Lens',
      'Low Light Correction',
      'USB 3.0 Connection',
      'Compatible with All Platforms'
    ]
  },
  {
    id: 3,
    name: 'Mechanical Keyboard RGB',
    category: 'Computing',
    price: 149.99,
    rating: 4.6,
    reviews: 278,
    description: 'Professional mechanical keyboard with customizable RGB lighting and mechanical switches.',
    image: 'https://images.unsplash.com/photo-1587829191301-fce29f50d039?w=500&h=500&fit=crop',
    specs: {
      'Switch Type': 'Mechanical Blue',
      'Backlighting': 'RGB LED',
      'Connectivity': 'Wireless & Wired',
      'Layout': 'Full Size'
    },
    inStock: true,
    features: [
      'Customizable RGB Lighting',
      'Mechanical Switches',
      'Programmable Keys',
      'Aluminum Frame',
      'USB Pass-Through'
    ]
  },
  {
    id: 4,
    name: 'Portable SSD 1TB',
    category: 'Storage',
    price: 89.99,
    rating: 4.8,
    reviews: 512,
    description: 'Ultra-fast portable SSD with 1TB storage capacity and rugged design.',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    specs: {
      'Capacity': '1TB',
      'Speed': 'Up to 1050MB/s',
      'Interface': 'USB-C 3.1',
      'Weight': '130g'
    },
    inStock: true,
    features: [
      'Fast Transfer Speed',
      'Portable Design',
      'Drop Resistant',
      'Hardware Encryption',
      'Cross-Platform Compatible'
    ]
  },
  {
    id: 5,
    name: 'USB-C Hub 7-in-1',
    category: 'Accessories',
    price: 49.99,
    rating: 4.4,
    reviews: 189,
    description: 'All-in-one USB-C hub with multiple ports for connectivity and charging.',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    specs: {
      'Ports': '7 (HDMI, USB 3.0 x3, SD, Micro SD, USB-C)',
      'Data Transfer': 'Up to 5Gbps',
      'Power Delivery': '100W',
      'Material': 'Aluminum Alloy'
    },
    inStock: true,
    features: [
      'Multi-Port Connectivity',
      'High-Speed Data Transfer',
      'Fast Charging',
      'Compact Design',
      'Aluminum Construction'
    ]
  },
  {
    id: 6,
    name: 'Monitor 4K 32"',
    category: 'Display',
    price: 449.99,
    rating: 4.6,
    reviews: 94,
    description: '4K ultra-high-definition monitor with HDR support for professional work and gaming.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    specs: {
      'Resolution': '4K (3840 x 2160)',
      'Panel Type': 'IPS',
      'Refresh Rate': '60Hz',
      'Response Time': '5ms'
    },
    inStock: false,
    features: [
      'HDR Support',
      'USB-C Connectivity',
      'Adjustable Stand',
      'Picture-by-Picture Mode',
      'Built-in Speakers'
    ]
  }
];

export async function GET(request, { params }) {
  const { id } = params;

  if (id) {
    // Get single item by ID
    const item = items.find(item => item.id === parseInt(id));
    if (!item) {
      return Response.json({ error: 'Item not found' }, { status: 404 });
    }
    return Response.json(item);
  }

  // Get all items
  return Response.json(items);
}
