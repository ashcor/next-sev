import { ProductService } from "@/util/product";

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {

  const { id } = await params;
  const service = new ProductService();

  const products = await service.getProducts(id)
  return <div>
    <h1>{id}</h1>
    <ul>
      {products.map((product) => <li key={product}>{product}</li>)}
    </ul>
    <p>
      <small>
        Generated at {new Date().toISOString()}
      </small>
    </p>
  </div>;
}