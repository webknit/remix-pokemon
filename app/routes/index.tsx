import { Link, Outlet, useLoaderData, Form, useSearchParams } from "@remix-run/react";
import { getAllPokemon } from "~/models/pokemon.server";
import invariant from "tiny-invariant";

import type { Pokemon } from "~/models/pokemon.server";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";

type LoaderData = Array<Pokemon>;

export let loader: LoaderFunction = async ({request}) => {
  const url = new URL(request.url)
  const search = new URLSearchParams(url.search);
  const pokemonParam = search.get('pokemon');

  let data: LoaderData = await getAllPokemon();

  if(pokemonParam) data = data.filter(item => item.name.includes(pokemonParam));

  return data;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("pokemon");

  return null;
};

export default function Index() {

  const data = useLoaderData() as LoaderData;
  const [params] = useSearchParams();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>The Pokemon page</h1>

      <Form method="get">
        <label>Search for a pokemon</label>
        <input type="text" name="pokemon" defaultValue={params.get('pokemon') || undefined}  />
        <button>Submit</button>
      </Form>

      {data.length ? <ul>
      {data.map(d => (
        <li key={d.name}><Link to={`/pokemon/${d.name}`}>{d.name}</Link></li>
      ))}
      </ul> : <p>No pokemon</p>}
      
      <Outlet />
    </div>
  );
}
