import { useLoaderData } from "react-router-dom";
export default function Home({ first }) {
  const data = useLoaderData();
  return <div>you are now logged in {data.first + " " + data.last} </div>;
}
