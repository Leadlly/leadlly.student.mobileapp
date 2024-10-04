import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const NoPlannerComponent = () => {
  return (
    <View className="flex-1 items-center justify-center mb-16 bg-white">
      <View className="px-5 space-y-5 justify-center -mt-10">
        <View className="items-center justify-center">
          <LottieView
            source={require("../../assets/planner_waiting_animation.json")}
            autoPlay
            style={{
              width: 200,
              height: 200,
              marginTop: -40,
            }}
          />
        </View>
        <Text className="text-xl text-primary font-mada-Bold leading-tight px-5">
          Planner will be ready shortly.....
        </Text>
        <Text className="text-sm leading-tight font-mada-regular text-tab-item-gray px-5">
          Please hold on.. while your plan is being generated, your itinerary
          will be ready shortly
        </Text>
      </View>
    </View>
  );
};

export default NoPlannerComponent;
