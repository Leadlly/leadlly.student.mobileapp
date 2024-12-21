import { View, Text, Image } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Slider1 = ({ width }: { width: number }) => {
  return (
    <View style={{ width }}>
      <View className="h-80 items-center justify-center">
        <View className="relative w-80 h-64">
          <LottieView
            source={require("../../../assets/upgrade_1.json")}
            style={{ width: "100%", height: "100%" }}
            autoPlay
          />

          <View className="w-4 h-4 rounded-full bg-black absolute left-0 top-10" />
          <View className="w-4 h-4 rounded-full bg-[#71ACDE] absolute left-1/2 top-0" />

          <View
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <Image
              source={require("../../../assets/images/clouds.png")}
              resizeMode="contain"
              className="w-full h-full"
            />
          </View>
          <View
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              left: 0,
              bottom: "30%",
            }}
          >
            <Image
              source={require("../../../assets/images/clouds.png")}
              resizeMode="contain"
              className="w-full h-full"
            />
          </View>
        </View>
      </View>
      <View className="items-center space-y-5">
        <Text className="text-center capitalize text-2xl font-mada-Bold">
          Upgrade Your <Text className="text-primary">Experience</Text>
        </Text>

        <Text className="text-lg font-mada-medium text-center max-w-[305px]">
          Subscribe to unlock premium features, tailored experiences, and
          unbeatable value
        </Text>
      </View>
    </View>
  );
};

export default Slider1;
