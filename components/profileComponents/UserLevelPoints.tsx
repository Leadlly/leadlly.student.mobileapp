import { View, Text } from "react-native";
import React from "react";
import LevelBox from "./LevelBox";
import { useAppSelector } from "../../services/redux/hooks";

const UserLevelPoints = () => {
  const userDetails = useAppSelector((state) => state.user.user?.details);

  return (
    <View className="flex-row mb-3">
      <LevelBox
        cardBgColor="bg-[#00B2FF]/[0.03] mr-2"
        pointsColor="text-[#0075FF]"
        points={
          userDetails?.level && userDetails.level.number
            ? userDetails.level.number
            : 0
        }
        pointsText="Level Up"
        progressValue={
          userDetails?.level && userDetails.level.number
            ? userDetails.level.number
            : 0
        }
        progressIndicatorBg="bg-[#0075FF]"
      />
      <LevelBox
        cardBgColor="bg-[#FF8A00]/[0.03] mr-2"
        pointsColor="text-[#FF9900]"
        points={
          userDetails?.points && userDetails.points.number
            ? userDetails.points.number
            : 0
        }
        pointsText="Points"
        progressValue={
          userDetails?.points && userDetails.points.number
            ? userDetails.points.number
            : 0
        }
        progressIndicatorBg="bg-[#FF9900]"
      />
      <LevelBox
        cardBgColor="bg-[#EF31FF]/[0.03]"
        pointsColor="text-[#FF00E5]"
        points={
          userDetails?.streak && userDetails.streak.number
            ? userDetails.streak.number
            : 0
        }
        pointsText="Streak"
        progressValue={
          userDetails?.streak && userDetails.streak.number
            ? userDetails.streak.number
            : 0
        }
        progressIndicatorBg="bg-[#FF00E5]"
      />
    </View>
  );
};

export default UserLevelPoints;
