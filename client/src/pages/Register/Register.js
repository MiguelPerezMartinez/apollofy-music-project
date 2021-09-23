import React, { useState } from "react";
import Input from "../../components/Input";
import SignNav from "../../components/SignNav";

import "./register.css";

import Button from "../../components/Button";

import { registerNewUser } from "../../services/firebase";
import { registerInApi } from "../../services/api/index";

function Register() {
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password, confirmPassword } = registerData;
    if (confirmPassword === password) {
      console.log("submit ", registerData);
      const { user } = await registerNewUser(email, password);

      console.log("the userFirebase: ", user.uid);
      const userApi = await registerInApi(registerData, user.uid);
      console.log("the userApi: ", userApi);
    } else {
      // Código de error
    }
  }

  return (
    <main className="gradient-background">
      <div className="login-register">
        <SignNav />
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="register-first-last-name">
            <Input
              type="text"
              id="firstname"
              label="Firstname"
              value={registerData.firstname}
              placeholder="Type firstname"
              handleChange={handleChange}
            />
            <Input
              type="text"
              id="lastname"
              label="Lastname"
              value={registerData.lastname}
              placeholder="Type lastname"
              handleChange={handleChange}
            />
          </div>
          <Input
            type="text"
            id="username"
            label="Username"
            value={registerData.username}
            placeholder="Type username"
            handleChange={handleChange}
          />
          <Input
            type="email"
            id="email"
            label="Email"
            value={registerData.email}
            placeholder="Type email"
            handleChange={handleChange}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            value={registerData.password}
            placeholder="Type password"
            handleChange={handleChange}
          />
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm password"
            value={registerData.confirmPassword}
            placeholder="Type password"
            handleChange={handleChange}
          />

          <div className="login-register-button-centered">
            <Button title="Register" />
          </div>
        </form>
      </div>
    </main>
  );
}

export default Register;
