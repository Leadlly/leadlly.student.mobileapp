import { View, Text, Image } from "react-native";
import React from "react";
import { TLevelPointProps } from "../../types/types";
import clsx from "clsx";
import * as Progress from "react-native-progress";
import { widthPercentage } from "../../helpers/utils";
import { calculateProgress } from "../../constants/constants";

const LevelBox = ({
  cardBgColor,
  pointsColor,
  points,
  pointsText,
  progressValue,
  progressIndicatorBg,
}: TLevelPointProps) => {
  return (
    <View
      className={clsx(
        "flex-1 border border-input-border rounded-xl p-2",
        cardBgColor
      )}
    >
      <View className="w-3.5 h-3.5 rounded-full">
        {pointsText === "Level Up" ? (
          <Image
            source={require("../../assets/images/trophy_cup.png")}
            className="w-full h-full rounded-full"
            resizeMode="contain"
          />
        ) : pointsText === "Points" ? (
          <Image
            source={require("../../assets/images/yellow_dollar_coin.png")}
            className="w-full h-full rounded-full"
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require("../../assets/images/fire_flame.png")}
            className="w-full h-full rounded-full"
            resizeMode="contain"
          />
        )}
      </View>

      <View className="w-full items-center justify-center mt-4">
        <Text
          className={clsx("leading-[0.5] text-xl font-semibold", pointsColor)}
        >
          {points}
        </Text>
        <Text className="text-sm font-medium text-[#6B6B6B]">{pointsText}</Text>
      </View>

      <View className="w-full items-center justify-center mt-4 mb-2">
        <Progress.Bar
          progress={calculateProgress(progressValue!)}
          unfilledColor="#fff"
          width={widthPercentage(22)}
          borderWidth={0}
          color={progressIndicatorBg}
        />
      </View>
    </View>
  );
};

export default LevelBox;
