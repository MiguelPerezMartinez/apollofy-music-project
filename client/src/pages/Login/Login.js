import React, { useState } from "react";
import "./login.css";
import Input from "../../components/Input";
import SignNav from "../../components/SignNav";
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

  const sendData = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div className="login">
      <SignNav />
      <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
      <form onSubmit={sendData}>
        <Input
          type="email"
          name="email"
          id="email"
          label="Email"
          placeholder="Name Surname"
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

        <button className="w-100 btn btn-lg btn-outline-warning" type="submit">
          singUp
        </button>
      </form>
    </div>
  );
}

export default Login;
