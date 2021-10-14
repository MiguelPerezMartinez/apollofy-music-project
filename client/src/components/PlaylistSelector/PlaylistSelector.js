import "./style.css";
import React, { useEffect } from "react";
import Select from "react-select";
import Button from "../../components/Button";
import { getAllMyPlaylist, addTrackToPlaylist } from "../../services/api/index";
import { useDispatch, useSelector } from "react-redux";
import { setMyPlaylistModal } from "../../redux/modalsHandler/actions";

import "./style.css";

function PlaylistSelector() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.userReducer);
  const trackDataDialog = useSelector((state) => state.modalsHandler.data);

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
    addTrackToPlaylist(e.value, trackDataDialog._id);
    dispatch(setMyPlaylistModal(false));
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
    <>
      <div
        onClick={() => {
          dispatch(setMyPlaylistModal(false));
        }}
        className="back-context"
      ></div>
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
    </>
  );
}

export default PlaylistSelector;
