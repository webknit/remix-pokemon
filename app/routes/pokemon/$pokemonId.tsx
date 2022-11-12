import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {SinglePokemon, getSinglePokemon} from '../../models/pokemon.server';

type LoaderData = {
  slug: string,
  data: SinglePokemon
};

export const loader = async ({ params }) => {

    const data = await getSinglePokemon(params.pokemonId)

    return json({ slug: params.pokemonId, data: data });
};

export default function SinglePokemon() {
  const {slug, data} = useLoaderData() as LoaderData;

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Some Pokemon: {slug}
      </h1>

      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>

      <p>Abilities</p>
      <ul>
      {data.abilities.map(ability => (
        <li key={ability.slot}>{ability.ability.name}</li>
      ))}
      </ul>
      
    </main>
  );
}