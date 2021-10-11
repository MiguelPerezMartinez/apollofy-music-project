const history = JSON.parse(localStorage.getItem("trackHistory"));
let initialHistoryPosition = 0;

if (history) {
  initialHistoryPosition = history.length - 2;
  if (initialHistoryPosition < 0) {
    initialHistoryPosition = 0;
  }
}

const initialTrackState = {
  isPlayBarDisplayed: false,
  isPlaying: false,
  trackObject: {
    title: "",
    author: "",
    album: "",
    releaseYear: "",
    genre: "",
    urlImage: "",
    urlTrack: "",
    owner: "object id",
    totalPlays: 0,
    totalLikes: 0,
    duration: "time",
  },
  waveSurfer: null,
  emptyHistoryQueue: true,
  positionInHistory: initialHistoryPosition,
};
export default initialTrackState;
