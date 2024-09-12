import { ProductService } from "@/util/product";


export default async function Page({ params }: { params: { lang: string, id: string } }) {

  const service = new ProductService();

  const products = await service.getProductsCached(params.id)
  return <div>
    <h1>{params.id}</h1>
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