import { View, Text, Image } from "react-native";
import React from "react";
import { MergedPlanData, UserDataProps } from "../../../types/types";
import PlanCard from "./PlanCard";

const Slider2 = ({
  mergedPricingData,
  user,
  width,
}: {
  mergedPricingData: (MergedPlanData | null)[] | undefined;
  user: UserDataProps | null;
  width: number;
}) => {
  const filteredPricingData = mergedPricingData?.filter(
    (data) => data?.title === "momentum"
  )[0];

  return (
    <View style={{ width }}>
      <View className="relative max-w-md w-full mx-auto h-80 items-center justify-center">
        <PlanCard pricingData={filteredPricingData} user={user} />

        <View className="w-3 h-3 rounded-full bg-black absolute left-1/4 top-10" />
        <View className="w-3 h-3 rounded-full bg-black absolute right-14 top-1/2" />
        <View className="w-3 h-3 rounded-full bg-[#71ACDE] absolute left-10 bottom-1/4" />

        <View
          style={{
            width: 80,
            height: 80,
            position: "absolute",
            top: "12%",
            right: -5,
          }}
        >
          <Image
            source={require("../../../assets/images/ellipse.png")}
            resizeMode="contain"
            className="w-full h-full"
          />
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            top: "20%",
            left: "12%",
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
            bottom: "10%",
            right: "12%",
          }}
        >
          <Image
            source={require("../../../assets/images/clouds.png")}
            resizeMode="contain"
            className="w-full h-full"
          />
        </View>
      </View>
      <View className="items-center space-y-5">
        <Text className="text-center capitalize text-2xl font-mada-Bold">
          Your First Month, <Text className="text-primary">On Us</Text>
        </Text>

        <Text className="text-lg font-mada-medium text-center max-w-[305px]">
          Enjoy all the premium features free for one month. Explore and
          discover the difference
        </Text>
      </View>
    </View>
  );
};

export default Slider2;
