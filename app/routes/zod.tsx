import { useLoaderData } from "@remix-run/react";

type Data = Array<number>; 

type Pokemon = {
  readonly name: string;
  readonly url: string
}

export async function loader() {
  //let data: Data = [1,2,3];

 

  return pokemon;
}

export default function Index() {

  const data: Array<Pokemon> = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>The Pokemon page</h1>
      <ul>
      {data.map(d => (
        <li key={d.name}>{d.name}</li>
      ))}
      </ul>
    </div>
  );
}
