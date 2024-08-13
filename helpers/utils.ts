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
