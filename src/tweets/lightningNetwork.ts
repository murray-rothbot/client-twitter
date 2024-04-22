import "dotenv/config";

import { TwitterApi } from "twitter-api-v2";
import axios from "axios";
import { postTweet } from "../utils/postTweet";

const baseUrl = process.env.SERVICE_MURRAY_SERVICE;

export const LightningNetwork = async ({
  clientTwitter,
}: {
  clientTwitter: TwitterApi;
}) => {
  try {
    let message = "";
    const result = await axios.get(`${baseUrl}/lightning/statistics`);

    if (result.data.data?.fields) {
      const {
        nodes,
        clearNet,
        tor,
        avgCapacity,
        totalCapacity,
        channels,
        avgFee,
        avgBaseFee,
      } = result.data.data.fields;

      message += `⚡ Lightning Network\n\n`;

      message += `${totalCapacity.description}: ${totalCapacity.value}\n`;
      message += `${avgCapacity.description}: ${avgCapacity.value}\n\n`;
      message += `${nodes.description}: ${nodes.value}\n`;
      message += `🤵‍♂️ Clearnet: ${clearNet.value}\n`;
      message += `🕵️ Tor: ${tor.value}\n\n`;
      message += `${channels.description}: ${channels.value}\n\n`;
      message += `${avgFee.description}: ${avgFee.value}\n`;
      message += `${avgBaseFee.description}: ${avgBaseFee.value}\n\n`;

      message += `#Bitcoin #LightningNetwork`;

      await postTweet({ clientTwitter, message });
    }
  } catch (error) {
    console.log(error);
  }
};
