import { View, Text, Image } from "react-native";
import React from "react";

const Slider3 = ({ width }: { width: number }) => {
  return (
    <View style={{ width }}>
      <View className="max-w-md w-full mx-auto h-80 items-center justify-center pl-3 mb-8">
        <Image
          source={require("../../../assets/images/onboard-image-1.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>

      <View className="items-center space-y-5">
        <Text className="text-center capitalize text-2xl font-mada-Bold">
          Why you join <Text className="text-primary">Premium</Text>
        </Text>

        <Text className="text-lg font-mada-medium text-center max-w-[305px]">
          Navigate with ease, save more, and access tools crafted to simplify
          your journey
        </Text>
      </View>
    </View>
  );
};

export default Slider3;
