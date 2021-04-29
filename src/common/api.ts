import axios from "axios";

const CLIENT = axios.create({ baseURL: "https://www.moodof.net/" });

export const post = async (uri: string, data: object, token: string) =>
  await CLIENT.post(uri, data, {
    headers: {
      Authorization: "Bearer " + token
    }
  })

export const get = async (uri: string, token: string) =>
  await CLIENT.get(uri, {
    headers: {
      Authorization: "Bearer " + token
    }
  })