import "./style.css";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { deleteTrack } from "../../services/api";
import { hideDialogue } from "../../redux/dialogueHandler/actions";
import { reloadFetchAction } from "../../redux/trackData/actions";

function DeleteModal() {
  const { trackDataDialog } = useSelector((state) => state.dialogueHandler);
  const { reloadFetch } = useSelector((state) => state.trackReducer);
  const dispatch = useDispatch();
  function deleteTrackSure() {
    deleteTrack(trackDataDialog._id);

    dispatch(hideDialogue());
    dispatch(reloadFetchAction(true));
  }
  return (
    <div className="deleteModal">
      <h2 className="delteTitle">Are you sure to delete?</h2>
      <Button title={"delete"} handleEdit={deleteTrackSure} />
    </div>
  );
}
export default DeleteModal;
