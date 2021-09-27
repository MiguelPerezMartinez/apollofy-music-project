import axios from "axios";

import {
  getCurrentUserToken,
  getCurrentUserId,
  firebaseUpdate,
} from "../firebase";

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
    url: `http://localhost:4000/users/get-user/${uid}`,
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
  console.log("apiAuth ", currentUser);
  return currentUser;
}

export async function updateById(id, userToken, bodyReq) {
  return axios({
    method: "PATCH",
    url: `http://localhost:4000/users/update-user/${id}`,
    data: bodyReq,

    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function updateCurrentUser(state) {
  const { id, ...bodyReq } = state;
  const { email } = bodyReq;
  const userToken = await getCurrentUserToken();
  const userId = await getCurrentUserId();
  if (email != "") {
    await firebaseUpdate(email);
  }
  console.log("firbaseUpdate");
  const { data } = await updateById(id, userToken, bodyReq);
  console.log("ApiUpdate");
  // const { currentUser } = data;
  // const { username, email } = currentUser;
  // console.log("usr id", userId);
}
