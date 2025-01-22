import { Dimensions } from "react-native";
import {
  SubjectChaptersProps,
  TChapterRevisionProps,
  TRevisionProps,
} from "../types/types";

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
export function calculateDaysLeft(meetingDate: Date): number {
  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = meetingDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  return daysLeft;
}
export function convertDateString(inputDate: Date): string {
  const utcDate = new Date(inputDate);

  // Convert to IST by adding 5 hours and 30 minutes
  const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);

  // Format the date
  const day = istDate.getDate().toString().padStart(2, "0");
  const month = (istDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = istDate.getFullYear();

  // Format the date as DD-MM-YYYY
  return `${day}-${month}-${year}`;
}
export function formatDate(
  dateString: Date,
  showYear: boolean = false
): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return showYear ? `${day} ${month} ${year}` : `${day} ${month}`;
}

export const filterItemsBySearch = (
  items: {
    _id: string;
    name: string | number;
  }[],
  searchValue: string
) => {
  if (!Array.isArray(items) || !searchValue) return items;

  const lowerSearchValue = searchValue.toLowerCase();

  return items.filter((item) =>
    item.name?.toString().toLowerCase().includes(lowerSearchValue)
  );
};

// Helper function to format an array of items with a mapper function
export const formatItems = <T>(
  items: T[],
  mapper: (item: T) => string
): string => {
  return items.map(mapper).map(capitalizeFirstLetter).join(" / ");
};

// Main function to format the topic string for weekly plan
export const formatTopicString = (item: {
  chapters: TChapterRevisionProps[];
  backRevisionTopics: TRevisionProps[];
  continuousRevisionTopics: TRevisionProps[];
  continuousRevisionSubTopics: TRevisionProps[];
}): string => {
  const parts: string[] = [];

  // Format chapters
  if (item.chapters.length > 0) {
    parts.push(formatItems(item.chapters, (chapter) => chapter.name));
  }

  // Format back revision topics
  if (item.backRevisionTopics.length > 0) {
    parts.push(
      formatItems(item.backRevisionTopics, (topic) => topic.topic.name)
    );
  }

  // Format continuous revision topics
  if (item.continuousRevisionTopics.length > 0) {
    parts.push(
      formatItems(item.continuousRevisionTopics, (topic) => topic.topic.name)
    );
  }

  // Format continuous revision subtopics
  if (item.continuousRevisionSubTopics.length > 0) {
    parts.push(
      formatItems(
        item.continuousRevisionSubTopics,
        (subtopic) => subtopic.subtopic.name
      )
    );
  }

  return parts.join(" / ");
};

export function convertToHourMinute(isoDateString: string): string {
  const date = new Date(isoDateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
