
export async function GET() {
    await fetch('https://mmneolqbpa.execute-api.eu-central-1.amazonaws.com/hook/log', {
        method: 'POST',
        body: JSON.stringify({tag: 'flush', time: Date.now()}),
        headers: { 'Content-Type': 'application/json' }
    });
    return Response.json({ ok: true, revalidated: true, now: Date.now() })
}