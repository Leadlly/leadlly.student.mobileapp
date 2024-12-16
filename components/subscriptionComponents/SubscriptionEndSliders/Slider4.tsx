import { View, Text, Image } from "react-native";
import React from "react";
import { MergedPlanData, UserDataProps } from "../../../types/types";
import PlanCard from "./PlanCard";
import clsx from "clsx";

const Slider4 = ({
  mergedPricingData,
  user,
  width,
}: {
  mergedPricingData: (MergedPlanData | null)[] | undefined;
  user: UserDataProps | null;
  width: number;
}) => {
  return (
    <View style={{ width }}>
      <View className="relative max-w-md w-full mx-auto h-80 items-center justify-center mb-5">
        {mergedPricingData?.map((plan) => (
          <View
            key={plan?._id}
            className={clsx(
              "absolute max-w-[180px] w-full",
              plan?.title === "momentum"
                ? "top-5 right-3"
                : plan?.title === "consistency"
                  ? "top-1/4 left-2"
                  : "bottom-10 right-8"
            )}
          >
            <PlanCard
              pricingData={plan}
              user={user}
              momentumCardBg="#FFD9AE"
              height={125}
            />
          </View>
        ))}

        <View className="w-3 h-3 rounded-full bg-black absolute left-10 top-10" />
        <View className="w-3 h-3 rounded-full bg-black absolute left-1/3 bottom-5" />
        <View
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            top: 0,
            left: "43%",
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
            bottom: 30,
            left: 30,
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
            bottom: 20,
            right: 10,
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
          Plan fit your <Text className="text-primary">lifestyle</Text>
        </Text>

        <Text className="text-lg font-mada-medium text-center max-w-[305px]">
          Choose from flexible options that cater to all your needs, from basic
          to premium
        </Text>
      </View>
    </View>
  );
};

export default Slider4;
