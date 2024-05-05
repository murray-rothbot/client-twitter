import { TwitterApi } from "twitter-api-v2";
import { Tweets } from "../tweets";
import { Utils } from "../utils";

export const Schedules = async ({
  client,
}: {
  client: TwitterApi;
}): Promise<void> => {
  Object.keys(Tweets).forEach((key) => {
    const schedule = Tweets[key as keyof typeof Tweets];

    if (schedule) {
      Utils.createCron({
        cron: schedule.cron,
        action: () => schedule.action({ clientTwitter: client }),
      });
    }
  });
};
