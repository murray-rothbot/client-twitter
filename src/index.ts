import "dotenv/config";

import { TwitterApi } from "twitter-api-v2";
import axios from "axios";
import { CronJob } from "cron";

const baseUrl = process.env.SERVICE_MURRAY_SERVICE;
const consoleMode = process.env.CONSOLE_MODE === "true" ? true : false;
const twitterConsumerKey = `${process.env.TWITTER_CONSUMER_KEY}`;
const twitterConsumerSecret = `${process.env.TWITTER_CONSUMER_SECRET}`;
const twitterAccessTokenKey = `${process.env.TWITTER_ACCESS_TOKEN_KEY}`;
const twitterAccessTokenSecret = `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`;

const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatDateTime = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let hour;
  if (date.getHours() < 10) {
    hour = `0${date.getHours()}`;
  } else {
    hour = date.getHours();
  }
  const minutes = date.getMinutes();

  return `${day}/${month}/${year} - ${hour}h${minutes}m`;
};

const postTweet = async ({
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

const postPrices = async ({ clientTwitter }: { clientTwitter: TwitterApi }) => {
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

      await postTweet({ clientTwitter, message });
    }
  } catch (error) {
    console.log(error);
  }
};

const postLN = async ({ clientTwitter }: { clientTwitter: TwitterApi }) => {
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

const postFees = async ({ clientTwitter }: { clientTwitter: TwitterApi }) => {
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
      message += `🔻 Purge Limit : ${minimum.value.replace("vByte", "vB")}\n\n`;

      message += `#Bitcoin #fees`;

      await postTweet({ clientTwitter, message });
    }
  } catch (error) {
    console.log(error);
  }
};

const postMarketCap = async ({
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

const postDifficulty = async ({
  clientTwitter,
}: {
  clientTwitter: TwitterApi;
}) => {
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
      }: ${formatDate(
        new Date(result.data.data.fields.estimatedDate.value)
      )}\n\n`;
      message += `Current Change   : ${result.data.data.fields.estimateChange.value}\n`;
      message += `Previous Change : ${result.data.data.fields.previousChange.value}\n\n`;

      message += `#Bitcoin #DifficultyAdjustment #GracePeriod`;

      await postTweet({ clientTwitter, message });
    }
  } catch (error) {
    console.log(error);
  }
};

const postHalving = async ({
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

const start = async () => {
  try {
    console.log("Starting Murray Rothbot on Twitter");
    console.log(baseUrl);

    const client = new TwitterApi({
      appKey: twitterConsumerKey,
      appSecret: twitterConsumerSecret,
      accessToken: twitterAccessTokenKey,
      accessSecret: twitterAccessTokenSecret,
    });

    const jobPrices = new CronJob(
      "0 0 1,3,5,7,9,11,13,15,17,19,21,23 * * *",
      function () {
        postPrices({ clientTwitter: client });
      },
      null,
      true,
      "America/Sao_Paulo"
    );
    jobPrices.start();

    const jobFees = new CronJob(
      "0 0 0,2,4,6,8,10,12,14,16,18,20,22 * * *",
      function () {
        postFees({ clientTwitter: client });
      },
      null,
      true,
      "America/Sao_Paulo"
    );
    jobFees.start();

    const jobLN = new CronJob(
      "0 30 10,19 * * *",
      function () {
        postLN({ clientTwitter: client });
      },
      null,
      true,
      "America/Sao_Paulo"
    );
    jobLN.start();

    const jobMarketCap = new CronJob(
      "0 45 10,19 * * *",
      function () {
        postMarketCap({ clientTwitter: client });
      },
      null,
      true,
      "America/Sao_Paulo"
    );
    jobMarketCap.start();

    const jobDifficulty = new CronJob(
      "0 45 9,18 * * *",
      function () {
        postDifficulty({ clientTwitter: client });
      },
      null,
      true,
      "America/Sao_Paulo"
    );
    jobDifficulty.start();

    const jobHalving = new CronJob(
      "0 15 9,12,14,19,21 * * *",
      function () {
        postHalving({ clientTwitter: client });
      },
      null,
      true,
      "America/Sao_Paulo"
    );
    jobHalving.start();
  } catch (error) {
    console.log(error);
  }
};

start();
