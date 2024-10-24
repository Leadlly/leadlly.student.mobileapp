import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../services/redux/hooks";
import { usePathname, useRouter } from "expo-router";
import { formatTime } from "../../helpers/utils";
import { freeTrialDays } from "../../constants/constants";

const FreeTrialTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const freeTrialActivation = useAppSelector(
    (state) => state.user.user?.freeTrial
  );

  useEffect(() => {
    const checkTrialStatus = () => {
      const trialStartDate = new Date(freeTrialActivation?.dateOfActivation!);
      const trialEndDate = new Date(trialStartDate.getTime() + freeTrialDays);
      const now = new Date();

      if (now >= trialEndDate && pathname !== "/subscription-plans") {
        console.log(trialEndDate, now >= trialEndDate);
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
  }, [freeTrialActivation?.dateOfActivation, router]);
  return (
    <Text className="text-[10px] leading-tight font-mada-medium text-white">
      {formatTime(timeLeft!)}
    </Text>
  );
};

export default FreeTrialTimer;
