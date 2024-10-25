type Params = Promise<{ country: string }>;

export default async function Page({params}: { params: Params }) {

    const {country} = await params;
    return <div>
        <h1>{country} Flavors</h1>
    </div>;
}