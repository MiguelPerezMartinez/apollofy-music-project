import axios from "axios";

export async function trackUpload(trackData) {
  return axios({
    method: "POST",
    url: `http://localhost:4000/tracks/upload-track`,
    data: trackData,
    // headers: {
    //   Authorization: `Bearer ${userToken}`,
    // },
  });
}
