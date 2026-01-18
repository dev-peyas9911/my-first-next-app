export async function GET(request, { params }) {
  const { id } = params;

  // Fetch from the items API route
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/items/${id}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return Response.json({ error: 'Item not found' }, { status: 404 });
    }

    const item = await response.json();
    return Response.json(item);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}
