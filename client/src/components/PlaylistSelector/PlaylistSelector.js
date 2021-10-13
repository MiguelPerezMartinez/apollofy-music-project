import "./style.css";
import React, { useState } from "react";
import Select from "react-select";
import Button from "../../components/Button";

function PlaylistSelector(params) {
  const [selectedOption, setSelectedOption] = useState("...");
  function choseOption(e) {
    setSelectedOption(e.value);
  }
  function send(e) {
    e.preventDefault();
    console.log(selectedOption);
  }
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: "green",
      padding: 20,
    }),
  };
  const options = [
    { value: "jon", label: "jon" },
    { value: "laia", label: "laia" },
    { value: "carlos", label: "carlos" },
    { value: "sergio", label: "sergio" },
    { value: "xica", label: "xica" },
    { value: "kim", label: "kim" },
  ];
  return (
    <div className="selectorModal">
      <h2 className="titleSelect">Select your playlist: </h2>

      <Select
        width="500px"
        menuColor="red"
        styles={customStyles}
        onChange={choseOption}
        options={options}
      />

      <h2 className="titleSelect">or... </h2>
      <Button
        title={"Add new one"}
        handleEdit={() => {
          alert("go to create new playlis");
        }}
      />
    </div>
  );
}

export default PlaylistSelector;
