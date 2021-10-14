import axios from "axios";

import { getCurrentUserToken } from "../firebase";

export async function apiTrackUpload(trackData) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_URL}tracks/upload-track`,
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
    url: `${process.env.REACT_APP_URL}tracks/increment-total-plays/${trackData}`,

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

export async function deleteTrack(track) {
  // console.log("That's the track to delete", track);
  const userToken = await getCurrentUserToken();
  return axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_URL}tracks/delete-track/${track}`,

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
export async function updateTrack(track) {
  // console.log("That's the track to delete", track);
  const userToken = await getCurrentUserToken();
  const { _id, ...trackBody } = track;
  return axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_URL}tracks/update-track/${_id}`,
    data: trackBody,
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

<<<<<<< HEAD
export async function getTrackByName(query) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}tracks/get-track-by-title/${query}`,
=======
export async function getTrackById(id) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}tracks/get-track/${id}`,
>>>>>>> d437fdab99c1ea5036ca57e799c1bc0b6f752738
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
