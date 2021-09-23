import axios from "axios";

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
