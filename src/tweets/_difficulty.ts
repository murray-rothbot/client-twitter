import "dotenv/config";

import axios from "axios";
import { TwitterApi } from "twitter-api-v2";
import { Utils } from "../utils";

const baseUrl = process.env.SERVICE_MURRAY_SERVICE;

export const Difficulty = {
  cron: "0 45 9,18 * * *",
  action: async ({ clientTwitter }: { clientTwitter: TwitterApi }) => {
    try {
      let message = "";
      const result = await axios.get(`${baseUrl}/blockchain/difficulty`);

      let progressMessage = "";

      if (result.data.data?.fields) {
        const currentProgress =
          result.data.data.fields.currentProgress.value.toFixed(2);

        for (let i = 0; i < 20; i++) {
          if (i < currentProgress * 0.2) {
            progressMessage += `▓`;
          } else {
            progressMessage += `░`;
          }
        }

        progressMessage += ` ${currentProgress}%`;

        message += `🦾 Bitcoin Difficulty Adjustment\n\n`;

        message += `${result.data.data.fields.currentProgress.description}\n\n${progressMessage}\n\n`;
        message += `${
          result.data.data.fields.estimatedDate.description
        }: ${Utils.formatDate(
          new Date(result.data.data.fields.estimatedDate.value)
        )}\n\n`;
        message += `Current Change   : ${result.data.data.fields.estimateChange.value}\n`;
        message += `Previous Change : ${result.data.data.fields.previousChange.value}\n\n`;

        message += `#Bitcoin #DifficultyAdjustment #GracePeriod`;

        await Utils.postTweet({ clientTwitter, message });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
