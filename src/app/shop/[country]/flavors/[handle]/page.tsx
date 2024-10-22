export default async function Page({params}: { params: { country: string, handle: string } }) {

    const country = params.country;
    const handle = params.handle;
    return <div>
        <h1><em>{handle}</em> Flavor {country}</h1>
    </div>;
}