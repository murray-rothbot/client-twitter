import "dotenv/config";

import { TwitterApi } from "twitter-api-v2";

const consoleMode = process.env.CONSOLE_MODE === "true" ? true : false;

type Props = { client: TwitterApi; message: string };

export const postTweet = async ({ client, message }: Props) => {
  try {
    if (consoleMode) {
      console.log(message);
    } else {
      await client.v2.tweet(message);
    }
  } catch (error) {
    console.log(error);
  }
};
