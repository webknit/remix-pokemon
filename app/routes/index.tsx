import { useLoaderData } from "@remix-run/react";

export async function loader() {
  return [1,2,3];
}

export default function Index() {

  const data = useLoaderData();



  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>The Pokemon page</h1>
      <ul>
      {data.map(d => (
        <li>{d}</li>
      ))}
      </ul>
    </div>
  );
}
