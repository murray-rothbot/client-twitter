import "dotenv/config";

import axios from "axios";
import { TwitterApi } from "twitter-api-v2";
import { Utils } from "../utils";

const baseUrl = process.env.SERVICE_MURRAY_SERVICE;

export const Fees = {
  cron: "0 0 0,2,4,6,8,10,12,14,16,18,20,22 * * *",
  action: async ({ clientTwitter }: { clientTwitter: TwitterApi }) => {
    try {
      let message = "";
      const result = await axios.get(`${baseUrl}/blockchain/fees/recommended`);

      if (result.data.data?.fields) {
        const { fastestFee, halfHourFee, hourFee, economy, minimum } =
          result.data.data.fields;
        message += `💸 Bitcoin Fees\n\n`;

        message += `🐇 Fastest : ${fastestFee.value.replace("vByte", "vB")}\n`;
        message += `🐢 +30 min : ${halfHourFee.value.replace("vByte", "vB")}\n`;
        message += `🐌 +60 min : ${hourFee.value.replace("vByte", "vB")}\n`;
        message += `🦥 +90 min : ${economy.value.replace("vByte", "vB")}\n\n`;
        message += `🔥 Purge Limit : ${minimum.value.replace(
          "vByte",
          "vB"
        )}\n\n`;

        message += `#Bitcoin #fees`;

        await Utils.postTweet({ clientTwitter, message });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
