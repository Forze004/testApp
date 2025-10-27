import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTime } from "luxon";

export const getElapsedTime = async (currentSecond: number) => {
  try {
    const startTime = await AsyncStorage.getItem("@start_time");

    if (startTime) {
      const now = DateTime.now();
      const startDate = DateTime.fromISO(JSON.parse(startTime));
      const { seconds }: any = now.diff(startDate, "seconds").toObject();

      if (seconds >= currentSecond) {
        recordStartTime();
        return 0;
      } else {
        return parseInt(seconds);
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

export const recordStartTime = async () => {
  try {
    const now = DateTime.now();
    await AsyncStorage.setItem("@start_time", JSON.stringify(now));
  } catch (err) {
    console.warn(err);
  }
};


export const dateFormat = (date: any, format?: string) => {
  if (date) {
    return DateTime.fromISO(
      typeof date === "string" ? date : date.toISOString()
    ).toFormat(format ? format : "dd.MM.yyyy");
  }
  return "";
};