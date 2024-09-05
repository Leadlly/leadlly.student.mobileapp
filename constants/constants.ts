export const colors = Object.freeze({
  primary: "#9654F4",
  primary200: "rgba(150, 84, 244, 0.5)",
  inputBorder: "#D9D8D8",
  tabItemGray: "#828282",
  secondaryText: "#6E6E6E",
  iconGray: "#7F7F7F",
  leadllyGreen: "#ff2e2e",
  leadllyYellow: "#ff9900",
  leadllyRed: "#0fd679",
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
    name: "chat",
    title: "Chat",
  },
  {
    name: "quizzes",
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
    title: "Weekly",
  },
  {
    id: "monthly",
    title: "Monthly",
  },
  {
    id: "overall",
    title: "Overall",
  },
];
