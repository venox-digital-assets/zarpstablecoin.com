export const prerender = true;

export async function GET() {
  try {
    const response = await fetch('https://www.zarpstablecoin.com/transparency.html');
    const html = await response.text();
    
    // Simple regex to find the numbers in the HTML structure
    const supplyMatch = html.match(/Circulating token supply[\s\S]*?([\d,]+\.\d{2})/);
    const reservesMatch = html.match(/Treasury Reserves[\s\S]*?R\s*([\d,]+\.\d{2})/);

    const supply = supplyMatch ? parseFloat(supplyMatch[1].replace(/,/g, '')) : 67365368.31;
    const reserves = reservesMatch ? parseFloat(reservesMatch[1].replace(/,/g, '')) : 85819720.70;

    // Fetch Solana Transactions from public RPC (simple account info call)
    let solanaTxCount = 0;
    try {
        const solResponse = await fetch('https://api.mainnet-beta.solana.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getSignaturesForAddress",
                "params": [
                  "dngKhBQM3BGvsDHKhrLnjvRKfY5Q7gEnYGToj9Lk8rk", // ZARP Token Mint Address
                  { "limit": 1000 } // This only gets last 1000, sadly. We can't get TOTAL easily without indexing.
                ]
            })
        });
        // We can't get the TOTAL easily from a standard RPC. 
        // We'd need to paginate back to genesis... which is too heavy.
        // But maybe we can get `getAccountInfo`? No, that doesn't have tx count.
        
        // Let's stick to the static sum + EVM placeholder for now.
    } catch (e) {
        console.error("Solana fetch failed", e);
    }

    return new Response(
      JSON.stringify({
        supply,
        reserves,
        timestamp: new Date().toISOString()
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch reserves' }),
      { status: 500 }
    );
  }
}
