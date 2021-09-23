import React, { useState } from "react";

import "./login.css";

import Input from "../../components/Input";
import SignNav from "../../components/SignNav";

import { logIn } from "../../services/firebase";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(state.email, state.password);
  };

  return (
    <main className="login-main gradient-background">
      <div className="login-register">
        <SignNav />
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="Email"
            handleChange={handleChange}
            defaultValue=""
          />

          <Input
            type="password"
            name="password"
            id="pass"
            label="Password"
            placeholder="password"
            handleChange={handleChange}
            defaultValue=""
          />

          <button
            className="w-100 btn btn-lg btn-outline-warning"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
