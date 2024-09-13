import {WsgService} from "./wsg";

export class ProductService {

    private readonly wsgService = new WsgService();

    // async getProductsCached(category: string): Promise<string[]> {
    //     const options = {tags: [category], revalidate: 360};
    //     const token = await this.wsgService.getToken();
    //     return cache((cat: string) => this.getProducts(cat, token), ['products-v2'], options)(category)
    //         .catch((error: unknown) => {
    //             throw new Error("Error", {cause: error});
    //         });
    // }

    async getProducts(category: string): Promise<string[]> {
        const token = await this.wsgService.getToken();
        console.log(`Fetch new products for category ${category}.`);
        const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-airup-app": "product",
        };
        const base = 'https://webshop-gateway-stage.svc.air-up.com';
        const response = await fetch(`${base}/v3/products/categories/${category}?region=dev1`, {
            headers,
            method: 'GET',
            next: { revalidate: 360, tags: [`category-${category}`] }
        });
        if (!response.ok) {
            const responseBody = await response.text();
            throw new Error(`Error fetching products from product service. ${response.status} ${responseBody}`);
        }

        return response
            .json()
            .then((response) => response.products.map((product: { name: string }) => product.name));
    };
}