import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

export default function Home({ first }) {
  const data = useLoaderData();
  let navigate = useNavigate();

  async function logout() {
    await axios.post(
      "http://localhost:4000/api/user/logout",
      {},
      { withCredentials: true }
    );
    navigate("/");
  }

  return (
    <div className="homepage-cont">
      Welcome {data.first + " " + data.last} you are now logged in.
      <Button variant="contained" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
