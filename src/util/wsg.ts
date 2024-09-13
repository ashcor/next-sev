
export class WsgService {

    // async getToken(): Promise<string> {
    //
    //     const options = {revalidate: 360};
    //     return cache(this.fetchNewToken, ['wsg-token-v2'], options)()
    //         .catch((error: unknown) => {
    //             throw new Error("Error", {cause: error});
    //         });
    // }

    async getToken(): Promise<string> {
        return this.fetchNewToken()
    }

    private fetchNewToken = async () => {
        console.log(`Fetch new token.`);

        const headers = {"content-type": "application/x-www-form-urlencoded; charset=utf-8"};
        const body = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.AIRUP_WEBSHOP_GATEWAY_CLIENT_CREDENTIALS?.split(':')[0] as string,
            client_secret: process.env.AIRUP_WEBSHOP_GATEWAY_CLIENT_CREDENTIALS?.split(':')[1] as string,
        });
        const base = 'https://webshop-gateway-stage.svc.air-up.com';
        const response = await fetch(`${base}/oauth2/token`, {
            headers,
            body,
            method: 'POST',
            next: {revalidate: 360, tags: ['wsg-token']}
        });

        if (!response.ok) {
            const responseBody = await response.text();
            throw new Error(`Error fetching JWT token from Airup Webshop Gateway. ${response.status} ${responseBody}`);
        }

        return response
            .json()
            .then((response) => response.access_token as string);
    };
}
