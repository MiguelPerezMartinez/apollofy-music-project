import React, { useState } from "react";
import Input from "../../components/Input";
import SignNav from "../../components/SignNav";
import "./register.css";

import { registerNewUser } from "../../services/firebase";
import { registerInApi } from "../../services/api";

function Register() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

<<<<<<< HEAD
  async function handleSubmit(e) {
=======
  function handleSubmit(e) {
    const { username, email, password, confirmPassword } = state;
>>>>>>> 6fd21d32add8afba5ad4a096caf1d331c7345143
    e.preventDefault();
    if (confirmPassword === password) {
      const user = await registerNewUser(email, password);
      console.log("the userFirebase: ", user);
      const userApi = await registerInApi(username, email).then((response) => {
        console.log(response);
      });
      console.log("the userApi: ", userApi);
      // const api = axios.create({ baseURL: "http://localhost:4000" });
      // api
      //   .post("/users/register", {
      //     username: username,
      //     email: email,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    } else {
      // Código de error
    }
  }

  return (
    <div className="register">
      <SignNav />
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="username"
          label="Username"
          value={state.username}
          placeholder="Your username"
          handleChange={handleChange}
        />
        <Input
          type="email"
          id="email"
          label="Email"
          value={state.email}
          placeholder="Your email"
          handleChange={handleChange}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          value={state.password}
          placeholder="Your password"
          handleChange={handleChange}
        />
        <Input
          type="password"
          id="confirmPassword"
          label="Confirm password"
          value={state.confirmPassword}
          placeholder="Repeat password"
          handleChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
