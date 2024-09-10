import { unstable_cache } from 'next/cache'

export default async function Page({ params }: { params: { id: string } }) {
  
  const getCached = unstable_cache(
    async () => {
      console.log(`Fetching ${params.id}`);
      return { id: params.id }
    },
    [params.id],
    {
      tags: ['key-1'],
      revalidate: 10,
    }
  )

  const id = await getCached()
  return <div>
    <h1>Hi {id.id}</h1>
  </div>;
}