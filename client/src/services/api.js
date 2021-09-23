import axios from "axios";

export async function registerInApi(username, email) {
  return axios({
    method: "POST",
    url: `http://localhost:4000/users/register`,
    data: {
      username: username,
      email: email,
    },
    // headers: {
    //   Authorization: `Bearer ${userToken}`,
    // },
  });
}
