import React, { useState } from "react";
import Input from "../../components/Input";
import SignNav from "../../components/SignNav";
import "./register.css";
import axios from "axios";

import { registerNewUser } from "../../services/firebase";

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

  function handleSubmit(e) {
    const { username, email, password, confirmPassword } = state;
    e.preventDefault();
    if (confirmPassword === password) {
      registerNewUser(email, password);
      const api = axios.create({ baseURL: "http://localhost:4000" });
      api
        .post("/users/register", {
          username: username,
          email: email,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Código de error
    }
  }

  return (
    <main className="gradient-background">
      <div className="general-container login-register">
        <SignNav />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            id="username"
            label="Username"
            defaultValue={username}
            placeholder="Type username"
            handleChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            type="email"
            name="email"
            id="email"
            label="Email"
            defaultValue={email}
            placeholder="Type email"
            handleChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            type="password"
            name="password"
            id="password"
            label="Password"
            defaultValue=""
            placeholder="Type password"
            handleChange={(e) => {
              setPasword(e.target.value);
            }}
          />
          <Input
            type="password"
            name="confirm-password"
            id="confirm-password"
            label="Confirm password"
            defaultValue=""
            placeholder="Type password"
            handleChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </main>
  );
}

export default Register;
