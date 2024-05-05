import "dotenv/config";

import axios from "axios";
import { TwitterApi } from "twitter-api-v2";
import { Utils } from "../utils";

const baseUrl = process.env.SERVICE_MURRAY_SERVICE;

export const Prices = {
  cron: "0 0 1,3,5,7,9,11,13,15,17,19,21,23 * * *",
  action: async ({ clientTwitter }: { clientTwitter: TwitterApi }) => {
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

        await Utils.postTweet({ clientTwitter, message });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
