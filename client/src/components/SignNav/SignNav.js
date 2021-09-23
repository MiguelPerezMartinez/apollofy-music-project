import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const SignNav = () => {
  return (
    <div className="signNav">
      <Link to="/login">LOGIN</Link>
      <Link to="/register">REGISTER</Link>
    </div>
  );
};

export default SignNav;
