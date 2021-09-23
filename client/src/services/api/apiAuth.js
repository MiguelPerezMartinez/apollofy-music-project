import axios from "axios";

export async function registerInApi(username, email, uid) {
  return axios({
    method: "POST",
    url: `http://localhost:4000/users/register`,
    data: {
      firebase_id: uid,
      username: username,
      email: email,
    },
    // headers: {
    //   Authorization: `Bearer ${userToken}`,
    // },
  });
}
