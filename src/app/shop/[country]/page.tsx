import {Metadata} from "next";

type Params = Promise<{ country: string }>;

export const generateMetadata = async ({params}: { params: Params }) => {
    const {country} = await params;
    const localizedAirUp = `air up® ${country}`;
    return {
        title: localizedAirUp,
    } satisfies Metadata;
};

export default async function Page({params}: { params: Params }) {

    const {country} = await params;
    return <div>
        <h1>{country} Shop</h1>
    </div>;
}