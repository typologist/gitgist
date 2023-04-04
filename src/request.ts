import axios from "axios";

export const makeGetRequest = (url: string, params?: Record<string, any>) =>
  axios.get(url, {
    headers: {
      Authorization: `token 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`,
    },
    params,
  });
