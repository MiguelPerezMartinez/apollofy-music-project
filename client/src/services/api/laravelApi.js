import axios from "axios";

import { getCurrentUserId } from "../firebase";

export async function postGlobalPlay(trackData) {
  const trackPlayerId = await getCurrentUserId();
  return axios({
    method: "POST",
    url: `http://127.0.0.1:8000/api/global-plays`,
    // url: `${process.env.LARAVEL_API_URL}api/global-plays`,
    data: {
      trackId: trackData._id,
      trackOwnerId: trackData.owner,
      trackPlayerId: trackPlayerId,
    },
    // headers: {
    //   Authorization: `Bearer ${userToken}`,
    // },
  });
}
