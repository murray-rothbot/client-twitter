import { CronJob } from "cron";

export const startCron = async ({
  cron,
  action,
}: {
  cron: string;
  action: () => void;
}) => {
  const jobPrices = new CronJob(cron, action, null, true, "America/Sao_Paulo");
  jobPrices.start();
  return jobPrices;
};
