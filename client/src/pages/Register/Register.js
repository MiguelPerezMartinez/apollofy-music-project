import React, { useState } from "react";
import Input from "../../components/Input";
import SignNav from "../../components/SignNav";
import "./register.css";
import axios from "axios";
import Button from "../../components/Button";

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
              name="firstname"
              id="firstname"
              label="Firstname"
              defaultValue={state.firstname}
              placeholder="Type firstname"
              handleChange={(e) => {
                state.setUsername(e.target.value);
              }}
            />
            <Input
              type="text"
              name="lastname"
              id="lastname"
              label="Lastname"
              defaultValue={state.lastname}
              placeholder="Type lastname"
              handleChange={(e) => {
                state.setUsername(e.target.value);
              }}
            />
          </div>
          <Input
            type="text"
            name="username"
            id="username"
            label="Username"
            defaultValue={state.username}
            placeholder="Type username"
            handleChange={(e) => {
              state.setUsername(e.target.value);
            }}
          />
          <Input
            type="email"
            name="email"
            id="email"
            label="Email"
            defaultValue={state.email}
            placeholder="Type email"
            handleChange={(e) => {
              state.setEmail(e.target.value);
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
              state.setPasword(e.target.value);
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
              state.setConfirmPassword(e.target.value);
            }}
          />

          <Button title="Register" />
        </form>
      </div>
    </main>
  );
}

export default Register;
