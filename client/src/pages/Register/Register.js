import React, { useState } from "react";
import Input from "../../components/Input";
import SignNav from "../../components/SignNav";
import "./register.css";
import axios from "axios";

import { registerNewUser } from "../../services/firebase";

function Register() {
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
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
          <div className="register-first-last-name">
            <Input
              type="text"
              id="firstname"
              label="Firstname"
              value={state.firstname}
              placeholder="Type firstname"
              handleChange={handleChange}
            />
            <Input
              type="text"
              id="lastname"
              label="Lastname"
              value={state.lastname}
              placeholder="Type lastname"
              handleChange={handleChange}
            />
          </div>
          <Input
            type="text"
            id="username"
            label="Username"
            value={state.username}
            placeholder="Type username"
            handleChange={handleChange}
          />
          <Input
            type="email"
            id="email"
            label="Email"
            value={state.email}
            placeholder="Type email"
            handleChange={handleChange}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            value={state.password}
            placeholder="Type password"
            handleChange={handleChange}
          />
          <Input
            type="password"
            id="confirmPassword"
            label="Confirm password"
            value={state.confirmPassword}
            placeholder="Type password"
            handleChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </main>
  );
}

export default Register;
