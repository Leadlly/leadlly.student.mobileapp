import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import FreeTrialTimer from "../dashboardComponents/FreeTrialTimer";
import { useAppSelector } from "../../services/redux/hooks";

const UpgradeButton = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <Link href="/subscription-plans" asChild>
      <TouchableOpacity className="px-4 h-9 bg-primary rounded-md items-center justify-center">
        <Text className="text-white leading-tight font-mada-semibold text-xs">
          Upgrade
        </Text>
        {user?.subscription.status !== "active" && <FreeTrialTimer />}
      </TouchableOpacity>
    </Link>
  );
};

export default UpgradeButton;
