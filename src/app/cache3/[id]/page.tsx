import { wsg } from "@/util/di";

export default async function Page({ params }: { params: { id: string } }) {

  const id = await wsg.getToken()
  return <div>
    <h1>Hi {id}</h1>
  </div>;
}