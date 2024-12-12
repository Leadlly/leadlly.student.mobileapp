import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../services/redux/hooks";
import { usePathname, useRouter } from "expo-router";
import { formatTime } from "../../helpers/utils";

const FreeTrialTimer = () => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();

  const freeTrialActivation = useAppSelector(
    (state) => state.user.user?.freeTrial
  );

  useEffect(() => {
    const checkTrialStatus = () => {
      const trialEndDate = new Date(freeTrialActivation?.dateOfDeactivation!);
      const now = new Date();

      // Redirect if the trial has ended and the user is not on the subscription page
      if (now >= trialEndDate && pathname !== "/subscription-plans") {
        console.log(trialEndDate, now >= trialEndDate);
        router.replace("/subscription-plans");
      } else {
        // Calculate remaining time in seconds
        const remainingTime = Math.max(
          0,
          Math.floor((trialEndDate.getTime() - now.getTime()) / 1000)
        );

        // Format remaining time to hours, minutes, and seconds
        const totalHours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;

        setTimeLeft(`${totalHours}h : ${minutes}m : ${seconds}s`);
      }
    };

    checkTrialStatus();

    // Update the timer every second
    const timerInterval = setInterval(() => {
      checkTrialStatus();
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [freeTrialActivation?.dateOfDeactivation, pathname, router]);

  return (
    <Text className="text-[10px] leading-tight font-mada-medium text-white">
      {timeLeft !== null ? timeLeft : "Loading..."}
    </Text>
  );
};

export default FreeTrialTimer;
