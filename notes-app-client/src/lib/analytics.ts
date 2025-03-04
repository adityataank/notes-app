import Eventlytics from "eventlytics";

import {
  EVENTLYTICS_API_KEY,
  MODE,
  PRODUCTION,
  PROJECT_TOKEN,
  USER_TOKEN,
} from "./constants";

const eventlytics = new Eventlytics(
  PROJECT_TOKEN ?? "",
  EVENTLYTICS_API_KEY ?? "",
  USER_TOKEN ?? ""
);

const track = (eventName: string, props?: Record<string, unknown>) => {
  if (MODE !== PRODUCTION) return; // tracking only for production
  eventlytics.track(eventName, {
    ...props,
  });
};

export const Analytics = { track };
