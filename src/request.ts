import axios from "axios";

export const makeGetRequest = (url) =>
  axios.get(url, {
    headers: { Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}` },
  });