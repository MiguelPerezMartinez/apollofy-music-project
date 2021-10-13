import "./style.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Button from "../../components/Button";
import { getAllMyPlaylist, addTrackToPlaylist } from "../../services/api/index";
import { useSelector } from "react-redux";

function PlaylistSelector() {
  const { data } = useSelector((state) => state.userReducer);
  const { trackDataDialog } = useSelector((state) => state.dialogueHandler);

  //const [selectedOption, setSelectedOption] = useState("...");

  useEffect(() => {
    getAllMyPlaylist(data.userId).then((res) => {
      const { myPlaylists } = res.data;
      myPlaylists.map((item) => {
        makeNewOptions(item.title);
      });
    });
  }, []);
  function choseOption(e) {
    // addTrackToPlaylist(trackDataDialog._id, e.value);
    console.log("Title", e.value);
    console.log("trackId", trackDataDialog._id);
  }

  const customStyles = {
    option: (provided) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: "green",
      padding: 20,
    }),
  };
  const options = [];

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
