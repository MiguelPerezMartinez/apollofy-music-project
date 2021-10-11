import axios from "axios";

import { getCurrentUserToken } from "../firebase";

export async function likeHandlerRequest(userId, trackId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_URL}tracks/handler-track-like/`,
    data: {
      userId: userId,
      trackId: trackId,
    },
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
