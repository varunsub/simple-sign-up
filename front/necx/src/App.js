import { useForm, Controller } from "react-hook-form";
import { Input, ListItemSecondaryAction, TextField } from "@mui/material";
import SignUpTextfield from "./Components/SignUpTextfield";
import axios from "axios";

function App() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first: "sdfsdfsdfs",
      last: "aaaaaa",
      email: "sdfasdf@gmail.com",
      password: "aaaaaa",
      cpassword: "aaaaaa",
    },
  });
  const fields = [
    { name: "first", placeholder: "First Name" },
    { name: "last", placeholder: "Last Name" },
    { name: "email", placeholder: "Email" },
    { name: "password", placeholder: "Password" },
    { name: "cpassword", placeholder: "Confirm Password" },
  ];
  const onSubmit = async (data) => {
    try {
      let response = await axios.post("http://localhost:4000/api/user", data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/HPMvxopIOso"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe> */}
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <input type="submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
