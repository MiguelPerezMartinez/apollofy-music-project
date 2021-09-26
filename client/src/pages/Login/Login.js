//Imports
import React, { useState } from "react";

import "./login.css";

import { logIn } from "../../services/firebase";
import { Link } from "react-router-dom";

//Import components
import Input from "../../components/Input";
import SignNav from "../../components/SignNav";
import Button from "../../components/Button";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  //Manage values of state properties 
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //Sign in with user email and password
  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(state.email, state.password);
  };

  return (
    <main className="login-main gradient-background">
      <div className="login-register">
        <SignNav />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            id="email"
            label="Email"
            value={state.email}
            placeholder="Type email"
            handleChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            id="password"
            label="Password"
            value={state.password}
            placeholder="Type password"
            handleChange={handleChange}
          />
          <Link to="/recover-password">
            <p className="mb-3 fw-normal">I have forgotten my password</p>
          </Link>
          <div className="login-register-button-centered">
            <Button title="Login" />
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
