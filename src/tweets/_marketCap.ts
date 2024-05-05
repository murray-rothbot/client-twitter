import "dotenv/config";

import axios from "axios";
import { TwitterApi } from "twitter-api-v2";
import { Utils } from "../utils";

const baseUrl = process.env.SERVICE_MURRAY_SERVICE;

export const MarketCap = {
  cron: "0 45 10,19 * * *",
  action: async ({ clientTwitter }: { clientTwitter: TwitterApi }) => {
    try {
      let message = "";
      const result = await axios.get(`${baseUrl}/market/capitalization`);

      if (result.data.data?.fields) {
        message += `💰 Bitcoin Market Cap\n\n`;

        message += `🇺🇸 Price: ${result.data.data.fields.btcusd.value.price.value}\n`;
        message += `⚡ Sats/USD: ${result.data.data.fields.btcusd.value.satsPerFiat.value}\n`;
        message += `💰 Market Cap: ${result.data.data.fields.btcusd.value.marketCap.value}\n\n`;

        message += `🇧🇷 Price: ${result.data.data.fields.btcbrl.value.price.value}\n`;
        message += `⚡ Sats/BRL: ${result.data.data.fields.btcbrl.value.satsPerFiat.value}\n`;
        message += `💰 Market Cap: ${result.data.data.fields.btcbrl.value.marketCap.value}\n\n`;

        message += `#Bitcoin #MarketCap #price`;
        await Utils.postTweet({ clientTwitter, message });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
