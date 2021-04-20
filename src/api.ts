import axios from "axios";

const CLIENT = axios.create({ baseURL: "https://moodof.tk/" });

export const post = async (uri: string, data: object, token: string) => {
  await CLIENT.post(uri, data, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
}
