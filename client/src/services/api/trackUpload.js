import axios from "axios";

import { getCurrentUserToken } from "../firebase";

export async function apiTrackUpload(trackData) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "POST",
    url: `http://localhost:4000/tracks/upload-track`,
    data: trackData,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function addTotalPlay(trackData) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "PATCH",
    url: `http://localhost:4000/tracks/increment-total-plays/${trackData}`,

    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
