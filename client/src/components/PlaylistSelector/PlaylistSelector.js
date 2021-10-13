import "./style.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Button from "../../components/Button";
import { getAllMyPlaylist } from "../../services/api/index";
import { useSelector } from "react-redux";

function PlaylistSelector(params) {
  const { trackDataDialog } = useSelector((state) => state.dialogueHandler);
  const [selectedOption, setSelectedOption] = useState("...");
  // const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    //console.log(trackDataDialog.owner);
    getAllMyPlaylist(trackDataDialog.owner).then((res) => {
      const { myPlaylists } = res.data;
      myPlaylists.map((item) => {
        makeNewOptions(item.title);
      });
    });
  }, []);
  function choseOption(e) {
    console.log(e.value);
  }
  function send(e) {
    e.preventDefault();
    console.log(selectedOption);
  }
  const customStyles = {
    option: (provided) => ({
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

  function makeNewOptions(newPlaylist) {
    options.push({ value: newPlaylist, label: newPlaylist });
  }
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
