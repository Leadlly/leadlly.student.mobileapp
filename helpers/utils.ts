import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getTodaysDay() {
  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];

  return `${dayOfWeek}`;
}

export function getMonthDate(date: Date): string {
  const dayOfMonth: string = String(date.getDate()).padStart(2, "0");
  const month: string = monthsOfYear[date.getMonth()];

  return `${month} ${dayOfMonth}`;
}

export function getTodaysFormattedDate() {
  const today = new Date();
  const dayOfMonth = String(today.getDate()).padStart(2, "0");
  const month = monthsOfYear[today.getMonth()];
  const year = today.getFullYear();

  return `${dayOfMonth} ${month} ${year}`;
}

export function getFormattedDate(date: Date): string {
  const dayOfMonth: string = String(date.getDate()).padStart(2, "0");
  const month: string = monthsOfYear[date.getMonth()];
  const year: number = date.getFullYear();

  return `${dayOfMonth} ${month} ${year}`;
}

export function capitalizeFirstLetter(
  sentence: string | undefined
): string | undefined {
  if (!sentence) {
    return sentence;
  }

  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export const widthPercentage = (percentage: number) => {
  return (percentage * width) / 100;
};

export const formatTime = (seconds: number) => {
  const days = Math.floor(seconds / (24 * 60 * 60))
    .toString()
    .padStart(2, "0");
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((seconds % (60 * 60)) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return `${days}d : ${hours}h : ${minutes}m : ${secs}s`;
};

export function isMoodButtonDisabled(lastMoodDate: String) {
  if (!lastMoodDate) return false;

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  return lastMoodDate === formattedToday;
}
