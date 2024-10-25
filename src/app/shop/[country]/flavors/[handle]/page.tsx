type Params = Promise<{ country: string, handle: string }>;

export default async function Page({params}: { params: Params }) {
    const {country, handle} = await params;
    return <div>
        <h1><em>{handle}</em> Flavor {country}</h1>
    </div>;
}