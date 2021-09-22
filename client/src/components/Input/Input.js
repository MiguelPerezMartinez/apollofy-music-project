import React from "react";

function Input({
  type,
  name,
  id,
  placeholder,
  defaultValue,
  handleChange,
  label,
}) {
  return (
    <>
      <div className="field">
        <input
          className="inputField"
          type={type}
          name={name}
          id={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
          //   defaultValue=""
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  );
}

export default Input;
