export async function POST(request) {
  try {
    const data = await request.json();
    const { name, description, price, category, image } = data;

    // Validation
    if (!name || !description || !price || !category) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    if (isNaN(price) || price <= 0) {
      return new Response(
        JSON.stringify({ error: 'Price must be a positive number' }),
        { status: 400 }
      );
    }

    // Create new item (in production, save to database)
    const newItem = {
      id: Math.floor(Math.random() * 100000),
      name,
      description,
      price: parseFloat(price),
      category,
      image: image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      rating: 0,
      reviews: 0,
      inStock: true,
      specs: {},
      features: [],
      createdAt: new Date().toISOString()
    };

    // In a real app, this would be saved to a database
    // For now, we'll just return success
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Item added successfully',
        item: newItem
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error adding item:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to add item' }),
      { status: 500 }
    );
  }
}
