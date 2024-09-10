import cache from "@/util/cache";

class WsgService {
  
  async getToken(): Promise<string> {
    
    const options = { revalidate: 10 };

    return cache(this.fetchToken, ['auth-token'], options)()
      .catch((error: unknown) => {
        throw new Error("Error", { cause: error });
      });
  }

  private fetchToken = async () => {
    console.log(`Fetch new token.`);
    return `42`;
  };
}


export default async function Page({ params }: { params: { id: string } }) {

  const service = new WsgService();

  const id = await service.getToken()
  return <div>
    <h1>Hi {id}</h1>
  </div>;
}