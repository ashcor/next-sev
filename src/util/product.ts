import cache from "./cache";
import { WsgService } from "./wsg";

export class ProductService {

    readonly wsgService = new WsgService();

    async getProductsCached(category: string): Promise<string[]> {
        const options = { tags: [category] };
        return cache(this.getProducts, ['prodcut-v1'], options)(category)
            .catch((error: unknown) => {
                throw new Error("Error", { cause: error });
            });
    }

    async getProducts(category: string): Promise<string[]> {

        console.log(`Fetch new products for category ${category}.`);

        const headers = {
            "Authorization": `Bearer ${await this.wsgService.getToken()}`,
            "Content-Type": "application/json",
            "x-airup-app": "product",
        };
        const base = 'https://webshop-gateway-stage.svc.air-up.com';
        const response = await fetch(`${base}/v3/products/categories/${category}?region=dev1`, { headers, method: 'GET', cache: 'no-store' });

        if (!response.ok) {
            const responseBody = await response.text();
            throw new Error(`Error fetching products from product service. ${response.status} ${responseBody}`);
        }

        return response
            .json()
            .then((response) => response.products.map((product: { name: string }) => product.name));
    };
}