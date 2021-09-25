import axios from "axios";

import { getCurrentUserToken, getCurrentUserId } from "../firebase";

export async function registerInApi(userData, uid) {
  return axios({
    method: "POST",
    url: `http://localhost:4000/users/register`,
    data: {
      firebase_id: uid,
      ...userData,
    },
    // headers: {
    //   Authorization: `Bearer ${userToken}`,
    // },
  });
}

export async function getById(uid, userToken) {
  return axios({
    method: "GET",
    url: `http://localhost:4000/users/getUser/${uid}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getCurrentUser() {
  const userToken = await getCurrentUserToken();
  const userId = await getCurrentUserId();
  const { data } = await getById(userId, userToken);
  const { currentUser } = data;
  // const { username, email } = currentUser;
  console.log("apiAuth ", currentUser);
  // console.log("usr id", userId);
  return currentUser;
}
