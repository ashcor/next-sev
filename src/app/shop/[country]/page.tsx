import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { country: string } }) => {
  const { country } = params;
  const localizedAirUp = `air up® ${country}`;
  return {
    title: localizedAirUp,
  } satisfies Metadata;
};

export default async function Page({ params }: { params: { country: string } }) {

    const country = params.country;
    return <div>
      <h1>{country} Shop</h1>    
    </div>;
  }