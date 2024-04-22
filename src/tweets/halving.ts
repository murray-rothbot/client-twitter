import "dotenv/config";

import { TwitterApi } from "twitter-api-v2";
import axios from "axios";
import { postTweet } from "../utils/postTweet";
import { formatDate } from "../utils/formatDate";

const baseUrl = process.env.SERVICE_MURRAY_SERVICE;

export const Halving = async ({
  clientTwitter,
}: {
  clientTwitter: TwitterApi;
}) => {
  try {
    let message = "";
    const result = await axios.get(`${baseUrl}/blockchain/halving`);

    let progressMessage = "";

    if (result.data.data?.fields) {
      const currentProgress =
        result.data.data.fields.completedPercentageRaw.value.toFixed(2);

      for (let i = 0; i < 20; i++) {
        if (i < currentProgress * 0.2) {
          progressMessage += `▓`;
        } else {
          progressMessage += `░`;
        }
      }
      progressMessage += ` ${currentProgress}%`;

      message += `${result.data.data.title}\n\n`;
      message += `${progressMessage}\n\n`;
      message += `${result.data.data.fields.halvingCountdown.description}: ${result.data.data.fields.halvingCountdown.value}\n\n`;
      message += `${result.data.data.fields.nextHalvingBlock.description}: ${result.data.data.fields.nextHalvingBlock.value}\n`;
      message += `${result.data.data.fields.height.description}: ${result.data.data.fields.height.value}\n\n`;

      message += `${result.data.data.fields.daysUntilHalving.description}: ${result.data.data.fields.daysUntilHalving.value}\n`;
      message += `${
        result.data.data.fields.nextHalvingDate.description
      }: ${formatDate(
        new Date(result.data.data.fields.nextHalvingDate.value)
      )}\n`;
      message += `${result.data.data.fields.halvingEra.description}: ${result.data.data.fields.halvingEra.value}\n\n`;

      message += `#Bitcoin #Halving`;

      await postTweet({ clientTwitter, message });
    }
  } catch (error) {
    console.log(error);
  }
};
