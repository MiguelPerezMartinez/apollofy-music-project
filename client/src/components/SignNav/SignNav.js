import React from "react";
import { Link } from "react-router-dom";
import "./signNav.css";
const SignNav = () => {
  return (
    <div className="signNav">
      <Link to="/login" className="signLink">
        <button className="w-50 btn btn-lg btn-outline-warning">Login</button>
      </Link>
      <Link to="/register" className="signLink">
        <button className="w-50 btn btn-lg btn-outline-warning signButton">
          Register
        </button>
      </Link>
    </div>
  );
};

export default SignNav;
