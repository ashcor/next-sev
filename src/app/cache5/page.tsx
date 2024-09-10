import { wsg } from "@/util/di";

export const dynamic = 'force-dynamic';

export default async function Page() {

  const id = await wsg.getToken()
  return <div>
    <h1>Hi {id}</h1>
  </div>;
}