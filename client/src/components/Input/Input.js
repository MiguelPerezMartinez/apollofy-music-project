import React from "react";

function Input({ type, id, placeholder, value, handleChange, label }) {
  return (
    <>
      <div className="field">
        <input
          className="inputField"
          type={type}
          name={id}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  );
}

export default Input;
