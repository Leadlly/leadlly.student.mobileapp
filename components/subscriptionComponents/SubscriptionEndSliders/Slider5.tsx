import { View, Text, Image } from "react-native";
import React from "react";

const Slider5 = ({ width }: { width: number }) => {
  return (
    <View style={{ width }}>
      <View className="max-w-md w-full mx-auto h-80 items-center justify-center mb-8">
        <Image
          source={require("../../../assets/images/onboard-image-2.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>

      <View className="items-center space-y-5">
        <Text className="text-center capitalize text-2xl font-mada-Bold">
          Unlock Exclusive <Text className="text-primary">Deals</Text>
        </Text>

        <Text className="text-lg font-mada-medium text-center max-w-[305px]">
          Activate your discount coupons and enjoy savings on every subscription
        </Text>
      </View>
    </View>
  );
};

export default Slider5;
