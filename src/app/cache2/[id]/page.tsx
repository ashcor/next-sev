import { WsgService } from "@/util/wsg";


export default async function Page({ params }: { params: { id: string } }) {

  const service = new WsgService();

  const id = await service.getToken()
  return <div>
    <h1>Hi {id}</h1>
  </div>;
}