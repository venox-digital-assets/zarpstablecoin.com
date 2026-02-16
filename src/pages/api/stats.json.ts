import stats from '../../data/stats.json';

export const prerender = true;

export async function GET() {
  return new Response(JSON.stringify(stats), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
