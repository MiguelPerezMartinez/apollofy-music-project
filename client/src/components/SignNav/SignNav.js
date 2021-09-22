import React from "react";
import { Link } from "react-router-dom";
const SignNav = () => {
  return (
    <div className="signNav">
      <button>
        <Link to="/login">Login</Link>
      </button>
      <button>
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default SignNav;
