import axios from "axios";

export async function apiTrackUpload(trackData) {
  return axios({
    method: "POST",
    url: `http://localhost:4000/tracks/upload-track`,
    data: trackData,
    // headers: {
    //   Authorization: `Bearer ${userToken}`,
    // },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
