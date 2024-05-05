import { Start } from "./start";

const init = async () => {
  try {
    console.log("Starting Murray Rothbot on Twitter");

    const client = await Start.Twitter();

    await Start.Schedules({ client });
  } catch (error) {
    console.log(error);
  }
};

init();
