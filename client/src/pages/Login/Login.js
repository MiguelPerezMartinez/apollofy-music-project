import React, { useState } from "react";
import "./login.css";
function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
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
      <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
      {/* <img className="img" src={loginImg} alt="" width="50%" height="200px" /> */}
      <form className="registerForm" onSubmit={sendData}>
        <div className="field">
          <input
            className="inputField"
            type="email"
            name="email"
            id="email"
            placeholder="Name Surname"
            onChange={handleSubmit}
            defaultValue=""
          />
          <label for="email">Email</label>
        </div>

        <div className="field">
          <input
            className="inputField"
            type="password"
            name="password"
            id="pass"
            placeholder="password"
            onChange={handleSubmit}
            defaultValue=""
          />
          <label for="pass">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-outline-warning" type="submit">
          singUp
        </button>
      </form>
    </div>
  );
}

export default Login;
