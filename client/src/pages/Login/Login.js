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
    <div className="login">
      <SignNav />
      <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          id="email"
          label="Email"
          placeholder="Your email"
          handleChange={handleChange}
          value={state.email}
        />

        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Your password"
          handleChange={handleChange}
          value={state.password}
        />

        <button className="w-100 btn btn-lg btn-outline-warning" type="submit">
          singUp
        </button>
      </form>
    </div>
  );
}

export default Login;
