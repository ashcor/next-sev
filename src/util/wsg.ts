import cache from "./cache";

export class WsgService {
  
    async getToken(): Promise<string> {
      
      const options = { revalidate: 60 };
  
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