import React, { useState } from "react";
import Input from "../../components/Input";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ username, email, password, confirmPassword });
  }

  return (
    <>
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
    </>
  );
}

export default Register;
