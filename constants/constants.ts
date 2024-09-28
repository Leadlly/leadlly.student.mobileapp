import { Plan } from "../types/types";

export const colors = Object.freeze({
  primary: "#9654F4",
  primary200: "rgba(150, 84, 244, 0.5)",
  inputBorder: "#D9D8D8",
  tabItemGray: "#828282",
  secondaryText: "#6E6E6E",
  iconGray: "#7F7F7F",
  leadllyGreen: "#0fd679",
  leadllyYellow: "#ff9900",
  leadllyRed: "#ff2e2e",
  leadllyCyan: "#72EFDD",
  leadllyChartYellow: "#FFDA57",
});

export const tabBarItems = [
  {
    name: "dashboard",
    title: "Dashboard",
  },
  {
    name: "(planner)",
    title: "Planner",
  },
  {
    name: "tracker",
    title: "Tracker",
  },
  {
    name: "(chat)",
    title: "Chat",
  },
  {
    name: "(quizzes)",
    title: "Quizzes",
  },
  {
    name: "errorbook",
    title: "Errorbook",
  },
  {
    name: "growth-meter",
    title: "Growth Meter",
  },
  {
    name: "workshops",
    title: "Workshops",
  },
  {
    name: "library",
    title: "Library",
  },
  {
    name: "study-room",
    title: "Study Room",
  },
];

export const plannerSubjectProgressString = [
  "Student feedback enriched and tailored learning experience.",
  "Provides insights for personalized academic assistance.",
  "Enables personalized learning and continuous improvement.",
];

export const moodEmojis = [
  {
    moodImg: require("../assets/images/sad_emoji.png"),
    mood_id: "sad-emoji",
    mood: "sad",
  },
  {
    moodImg: require("../assets/images/unhappy_emoji.png"),
    mood_id: "unhappy-emoji",
    mood: "unhappy",
  },
  {
    moodImg: require("../assets/images/neutral_emoji.png"),
    mood_id: "neutral-emoji",
    mood: "neutral",
  },
  {
    moodImg: require("../assets/images/smiling_emoji.png"),
    mood: "smiling",
    mood_id: "smiling-emoji",
  },
  {
    moodImg: require("../assets/images/laughing_emoji.png"),
    mood_id: "laughing-emoji",
    mood: "laughing",
  },
];

export const progressAnalyticsMenus = [
  {
    id: "weekly",
    name: "weekly",
  },
  {
    id: "monthly",
    name: "monthly",
  },
  {
    id: "overall",
    name: "overall",
  },
];

export const features = [
  {
    title: "Planning & Organization",
    details: [
      "Goal Setting & Tracking",
      "Schedule Builder",
      "To-Do List & Reminders",
      "Subject, Chapter & Topic Tracking",
    ],
  },
  {
    title: "Expert Guidance & Support",
    details: ["Connect with a Mentor", "Live & On-Demand Workshops"],
  },
  {
    title: "Learning Optimization",
    details: ["Growth Meter", "Points & Levels", "Know Your Mistakes"],
  },
];

export const plans: Plan[] = [
  {
    id: 1,
    name: "3 Months",
    price: "499",
    planType: "Basic Plan",
    duration: "3",
  },
  {
    id: 2,
    name: "6 Months",
    price: "416",
    planType: "Professional Plan",
    duration: "6",
  },
  {
    id: 3,
    name: "1 Year",
    price: "333",
    planType: "Ultimate Plan",
    duration: "12",
  },
];