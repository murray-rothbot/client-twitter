import "dotenv/config";

import { TwitterApi } from "twitter-api-v2";

const consoleMode = process.env.CONSOLE_MODE === "true" ? true : false;

export const postTweet = async ({
  clientTwitter,
  message,
}: {
  clientTwitter: TwitterApi;
  message: string;
}) => {
  try {
    if (consoleMode) {
      console.log(message);
    } else {
      await clientTwitter.v2.tweet(message);
    }
  } catch (error) {
    console.log(error);
  }
};
