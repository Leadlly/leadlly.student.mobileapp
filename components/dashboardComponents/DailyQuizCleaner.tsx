import React, { useEffect, useCallback, useRef } from "react";
import { clearAttemptedQuestions } from "../../services/redux/slices/dailyQuizSlice";
import { useAppDispatch } from "../../services/redux/hooks";

const DailyQuizCleaner: React.FC = () => {
  const dispatch = useAppDispatch();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearStateAndScheduleNext = useCallback(() => {
    console.log("Clearing state");
    dispatch(clearAttemptedQuestions());
    scheduleNextClear();
  }, [dispatch]);

  const scheduleNextClear = useCallback(() => {
    const now = new Date();
    const nextClear = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // Always schedule for the next day
      1, // 1 AM
      0, // 0 minutes
      0 // 0 seconds
    );

    const timeUntilClear = nextClear.getTime() - now.getTime();

    console.log(
      `Scheduling next clear in ${timeUntilClear / 1000 / 60} minutes`
    );
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(clearStateAndScheduleNext, timeUntilClear);
  }, [clearStateAndScheduleNext]);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 1) {
      // If it's past 1 AM, clear immediately and schedule next
      clearStateAndScheduleNext();
    } else {
      // If it's before 1 AM, just schedule for the upcoming 1 AM
      scheduleNextClear();
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [clearStateAndScheduleNext, scheduleNextClear]);

  return null;
};

export default DailyQuizCleaner;
