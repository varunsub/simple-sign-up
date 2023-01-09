import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home";
import axios from "axios";

const authChecker = async () => {
  try {
    let res = await axios.get("http://localhost:4000/api/user", {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return redirect("/");
  }
};
const lChecker = async () => {
  try {
    let res = await axios.get("http://localhost:4000/api/user", {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return {};
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    loader: lChecker,
  },
  {
    path: "home",
    element: <Home />,
    loader: authChecker,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
