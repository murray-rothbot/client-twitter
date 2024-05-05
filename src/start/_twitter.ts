import "dotenv/config";

import { TwitterApi } from "twitter-api-v2";

const twitterConsumerKey = `${process.env.TWITTER_CONSUMER_KEY}`;
const twitterConsumerSecret = `${process.env.TWITTER_CONSUMER_SECRET}`;
const twitterAccessTokenKey = `${process.env.TWITTER_ACCESS_TOKEN_KEY}`;
const twitterAccessTokenSecret = `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`;

export const Twitter = async () => {
  return new TwitterApi({
    appKey: twitterConsumerKey,
    appSecret: twitterConsumerSecret,
    accessToken: twitterAccessTokenKey,
    accessSecret: twitterAccessTokenSecret,
  });
};
