import { useForm } from "react-hook-form";
import { Alert, Button } from "@mui/material";
import SignUpTextfield from "../Components/SignUpTextfield";
import axios from "axios";
import { useState } from "react";
import "../styles/main.css";
import { useNavigate, useLoaderData } from "react-router-dom";

function Landing() {
  const [reg, setReg] = useState(true);
  let navigate = useNavigate();
  const data = useLoaderData();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      first: "",
      last: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });
  function changeMenu() {
    setError("");
    setReg(!reg);
  }
  const [error, setError] = useState("");

  const fields = [
    { name: "first", placeholder: "First Name" },
    { name: "last", placeholder: "Last Name" },
    { name: "email", placeholder: "Email" },
    { name: "password", placeholder: "Password" },
    { name: "cpassword", placeholder: "Confirm Password" },
  ];

  const loginFields = [
    { name: "email", placeholder: "Email" },
    { name: "password", placeholder: "Password" },
  ];

  const onSubmit = async (data) => {
    if (reg) {
      setError("");
      if (data.password !== data.cpassword) {
        setError("Make sure your passwords are the same");
        return;
      } else if (data.password.length < 5) {
        setError("Password is too short");
      } else {
        for (let item of Object.keys(data)) {
          if (data[item] === "") {
            setError("Fill out all fields");
            return;
          }
        }
      }
      try {
        let response = await axios.post(
          "http://localhost:4000/api/user",
          data,
          {
            withCredentials: true,
          }
        );
        navigate("/home");
        console.log("ran");
        setError("");
      } catch (e) {
        console.log(e);
        setError(e.response.data);
      }
    } else {
      try {
        let response = await axios.post(
          "http://localhost:4000/api/user/login",
          data,
          {
            withCredentials: true,
          }
        );
        setError("");
        navigate("/home");
      } catch (e) {
        setError("Invalid username or password");
      }
    }
  };

  return (
    <div className="App">
      <div className="landing-cont">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/HPMvxopIOso"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        {reg ? (
          <form onSubmit={handleSubmit(onSubmit)} className="login-cont">
            {error.length > 0 ? (
              <Alert
                onClose={() => setError("")}
                variant="filled"
                severity="error"
              >
                {error}
              </Alert>
            ) : null}
            {fields.map((i, x) => {
              return (
                <SignUpTextfield
                  key={x}
                  control={control}
                  name={i.name}
                  placeholder={i.placeholder}
                />
              );
            })}
            <p>Passwords must be alphanumeric and atleast 5 characters</p>
            <input type="submit" value="Register" className="submit-button" />
            <Button
              variant="outlined"
              className="swap-buttons"
              onClick={() => changeMenu()}
            >
              Already have an account? Login
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="login-cont">
            {error.length > 0 ? (
              <Alert
                onClose={() => setError("")}
                variant="filled"
                severity="error"
              >
                {error}
              </Alert>
            ) : null}
            {loginFields.map((i, x) => {
              return (
                <SignUpTextfield
                  key={x}
                  control={control}
                  name={i.name}
                  placeholder={i.placeholder}
                />
              );
            })}
            <input type="submit" value="Login" className="submit-button" />
            <Button
              variant="outlined"
              className="swap-buttons"
              onClick={() => changeMenu()}
            >
              Don't have an account? Register
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
export default Landing;
