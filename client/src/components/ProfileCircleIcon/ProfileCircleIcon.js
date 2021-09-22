import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

export default function ProfileCircleIcon() {
  return (
    <div className="profile-circle-background">
      <div className="profile-picture">
        <Link to="/profile">img</Link>
      </div>
    </div>
  );
}
