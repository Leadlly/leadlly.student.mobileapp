import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../services/redux/hooks";
import { usePathname, useRouter } from "expo-router";
import { formatTime } from "../../helpers/utils";

const FreeTrialTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

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

        setTimeLeft(remainingTime);
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
      {timeLeft !== null ? formatTime(timeLeft) : "Loading..."}
    </Text>
  );
};

export default FreeTrialTimer;
