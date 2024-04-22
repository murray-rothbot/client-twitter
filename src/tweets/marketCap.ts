import "dotenv/config";

import { TwitterApi } from "twitter-api-v2";
import axios from "axios";
import { postTweet } from "../utils/postTweet";

const baseUrl = process.env.SERVICE_MURRAY_SERVICE;

export const MarketCap = async ({
  clientTwitter,
}: {
  clientTwitter: TwitterApi;
}) => {
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
      await postTweet({ clientTwitter, message });
    }
  } catch (error) {
    console.log(error);
  }
};
