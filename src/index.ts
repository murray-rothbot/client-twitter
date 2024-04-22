import { Utils } from "./utils";
import { Tweets } from "./tweets";

const start = async () => {
  try {
    console.log("Starting Murray Rothbot on Twitter");

    const client = await Utils.startDiscord();

    Utils.startCron({
      cron: "0 0 1,3,5,7,9,11,13,15,17,19,21,23 * * *",
      action: () => {
        Tweets.Prices({ clientTwitter: client });
      },
    });
    Utils.startCron({
      cron: "0 0 0,2,4,6,8,10,12,14,16,18,20,22 * * *",
      action: () => {
        Tweets.Fees({ clientTwitter: client });
      },
    });
    Utils.startCron({
      cron: "0 30 10,19 * * *",
      action: () => {
        Tweets.LightningNetwork({ clientTwitter: client });
      },
    });
    Utils.startCron({
      cron: "0 45 10,19 * * *",
      action: () => {
        Tweets.MarketCap({ clientTwitter: client });
      },
    });
    Utils.startCron({
      cron: "0 45 9,18 * * *",
      action: () => {
        Tweets.Difficulty({ clientTwitter: client });
      },
    });
    Utils.startCron({
      cron: "0 15 9,12,14,19,21 * * *",
      action: () => {
        Tweets.Halving({ clientTwitter: client });
      },
    });
  } catch (error) {
    console.log(error);
  }
};

start();
