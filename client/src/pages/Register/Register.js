import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit() {
    // Codigo de submiteo
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPasword(e.target.value);
          }}
        />
        <label htmlFor="confirm-password">Confirm password:</label>
        <input
          type="text"
          name="confirm-password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default Register;
