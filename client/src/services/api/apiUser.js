import axios from "axios";

import { getCurrentUserToken } from "../firebase";

export async function getTotalPlays(userId) {
  const userToken = await getCurrentUserToken();
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_URL}users/get-user/${userId}/total-plays`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
