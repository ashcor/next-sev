import { ProductService } from "@/util/product";


export default async function Page({ params }: { params: { id: string } }) {

  const service = new ProductService();

  const id = await service.getProducts(params.id)
  return <div>
    <h1>Hi {id}</h1>
  </div>;
}