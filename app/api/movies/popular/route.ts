const API_URL = process.env.TMDB_API_URL;
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const url = new URL(`${API_URL}/movie/popular`);
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    for (const [key, value] of searchParams) {
      url.searchParams.set(key, value);
    }

    const response = await fetch(url.toString(), options);

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(
        JSON.stringify({
          status: response.status,
          message: errorData.status_message || 'Failed to fetch data',
        }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
