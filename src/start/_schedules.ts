import { TwitterApi } from "twitter-api-v2";

import { Messages } from "../messages";
import { Utils } from "../utils";

type Props = { client: TwitterApi };

export const Schedules = async ({ client }: Props): Promise<void> => {
  Object.keys(Messages).forEach((key) => {
    const schedule = Messages[key as keyof typeof Messages];

    if (schedule) {
      Utils.createCron({
        cron: schedule.cron,
        action: () => schedule.action({ client }),
      });
    }
  });
};
