export default async function Page({params}: { params: { country: string } }) {

    const country = params.country;
    return <div>
        <h1>{country} Flavors</h1>
    </div>;
}