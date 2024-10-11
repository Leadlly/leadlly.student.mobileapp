import { View, Text, Image } from "react-native";
import React from "react";
import { useAppSelector } from "../../services/redux/hooks";

const LevelAndPoints = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <View className="flex-row items-center space-x-1">
      <View className="flex-row items-center space-x-0.5">
        <Image
          source={require("../../assets/images/trophy_cup.png")}
          resizeMode="contain"
          className="w-4 h-4"
        />
        <Text className="text-xs font-mada-medium text-[#0075FF]">
          {user &&
            user.details &&
            user.details.level &&
            user.details.level?.number}
        </Text>
      </View>
      <View className="flex-row items-center space-x-0.5">
        <Image
          source={require("../../assets/images/yellow_dollar_coin.png")}
          resizeMode="contain"
          className="w-4 h-4"
        />
        <Text className="text-xs font-mada-medium text-[#FF9900]">
          {user &&
            user.details &&
            user.details.points &&
            user.details.points?.number}
        </Text>
      </View>
      <View className="flex-row items-center space-x-0.5">
        <Image
          source={require("../../assets/images/fire_flame.png")}
          resizeMode="contain"
          className="w-3.5 h-3.5"
        />
        <Text className="text-xs font-mada-medium text-[#FF00E5]">
          {user &&
            user.details &&
            user.details.streak &&
            user.details.streak?.number}
        </Text>
      </View>
    </View>
  );
};

export default LevelAndPoints;
