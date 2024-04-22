import "dotenv/config";

import axios from "axios";
import { TwitterApi } from "twitter-api-v2";
import { postTweet } from "../utils/postTweet";

const baseUrl = process.env.SERVICE_MURRAY_SERVICE;

export const Prices = async ({
  clientTwitter,
}: {
  clientTwitter: TwitterApi;
}) => {
  try {
    let message = "";
    const result = await axios.get(`${baseUrl}/prices`);

    if (result.data.data?.fields) {
      message += `${result.data.data.title}\n\n`;
      Object.keys(result.data.data.fields).forEach((key) => {
        const price = result.data.data.fields[key];
        const values = price.value.split("\n");

        message += `${price.description}\n${
          values[0]
        }\n${values[1].trim()}\n\n`;
      });
      message += `#Bitcoin`;

      await postTweet({ clientTwitter, message });
    }
  } catch (error) {
    console.log(error);
  }
};
