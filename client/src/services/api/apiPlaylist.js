import axios from "axios";

import {
  getCurrentUserToken,
  //   getCurrentUserId,
  //   firebaseEmailUpdate,
} from "../firebase";

export async function getAllMyPlaylist(userId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}users/get-user/${userId}/my-playlists`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
export async function addTrackToPlaylist(playlisTitle, trackId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_URL}/`,
    data: { trackId: trackId, title: playlisTitle },
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
