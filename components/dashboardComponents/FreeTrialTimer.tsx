import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../services/redux/hooks";
import { useRouter } from "expo-router";
import { formatTime } from "../../helpers/utils";

const FreeTrialTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const router = useRouter();

  const freeTrialActivationDate = useAppSelector(
    (state) => state.user.user?.freeTrial.dateOfActivation
  );

  useEffect(() => {
    const checkTrialStatus = () => {
      const trialStartDate = new Date(freeTrialActivationDate!);
      const trialEndDate = new Date(
        trialStartDate.getTime() + 21 * 24 * 60 * 60 * 1000
      );
      const now = new Date();

      if (now >= trialEndDate) {
        router.replace("/subscription-plans");
      } else {
        const remainingTime = Math.max(
          0,
          Math.floor((trialEndDate.getTime() - now.getTime()) / 1000)
        );

        setTimeLeft(remainingTime);
      }
    };

    checkTrialStatus();

    const timerInterval = setInterval(() => {
      checkTrialStatus();
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [freeTrialActivationDate, router]);
  return (
    <Text className="text-[10px] leading-tight font-mada-medium text-white">
      {formatTime(timeLeft!)}
    </Text>
  );
};

export default FreeTrialTimer;
