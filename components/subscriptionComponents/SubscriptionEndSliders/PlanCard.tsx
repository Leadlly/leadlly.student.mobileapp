import { View, Text } from "react-native";
import React from "react";
import { MergedPlanData, UserDataProps } from "../../../types/types";

const PlanCard = ({
  pricingData,
  user,
  consistencyCardBg = "#EEFF9B",
  momentumCardBg = "#8CEBFF",
  sturdyCardBg = "#C8FFB6",
  maxWidth = 240,
  height = 144,
}: {
  pricingData: MergedPlanData | null | undefined;
  user: UserDataProps | null;
  maxWidth?: number;
  height?: number;
  momentumCardBg?: string;
  consistencyCardBg?: string;
  sturdyCardBg?: string;
}) => {
  return (
    <View
      style={{
        maxWidth,
        height,
        backgroundColor:
          pricingData?.title === "momentum"
            ? momentumCardBg
            : pricingData?.title === "consistency"
              ? consistencyCardBg
              : sturdyCardBg,
      }}
      className="w-full rounded-lg p-3"
    >
      <View className="border-b border-tab-item-gray pb-2">
        <Text className="capitalize text-xs font-mada-Bold">
          {pricingData?.title} plan
        </Text>
      </View>

      <View className="flex-row items-center space-x-1 pt-1">
        <Text className="text-2xl leading-8 font-mada-Bold">
          ₹
          {Math.round(
            Number(pricingData?.amount) /
              Number(pricingData?.["duration(months)"])
          )}
        </Text>
        <Text className="text-sm font-mada-semibold">/ month</Text>
      </View>

      <View className="flex-row items-center space-x-1">
        <Text className="text-xs font-mada-regular">
          {pricingData?.discountPercentage}% OFF
        </Text>
        <View className="relative">
          <View className="absolute top-1/2 left-0 -translate-y-0.5 -rotate-[6deg] w-16 h-0.5 bg-leadlly-red" />
          <Text className="text-xs font-mada-regular">
            ₹
            {Math.round(
              Number(pricingData?.initialPrice) /
                Number(pricingData?.["duration(months)"])
            )}
            / month
          </Text>
        </View>
      </View>
      <Text className="text-xs font-mada-regular font-bold py-1 mt-auto">
        Valid till:{" "}
        {user?.subscription.status === "active"
          ? new Date(
              new Date(
                user.subscription.dateOfDeactivation || new Date()
              ).getTime() +
                Number(pricingData?.["duration(months)"]) *
                  30 *
                  24 *
                  60 *
                  60 *
                  1000
            ).toLocaleDateString("en-GB", {
              month: "short",
              year: "numeric",
            })
          : `${pricingData?.["duration(months)"]} month${Number(pricingData?.["duration(months)"]) > 1 ? "s" : ""}`}
        {user?.subscription.status === "active" &&
          pricingData?.title === "momentum" &&
          " (1 month)"}
        {user?.subscription.status === "active" &&
          pricingData?.title === "consistency" &&
          (user?.academic?.competitiveExam === "neet"
            ? " (NEET 2025)"
            : user?.academic?.competitiveExam === "jee"
              ? " (JEE 2025)"
              : "")}
        {user?.subscription.status === "active" &&
          pricingData?.title === "sturdy-step" &&
          (user?.academic?.competitiveExam === "neet"
            ? " (NEET 2026)"
            : user?.academic?.competitiveExam === "jee"
              ? " (JEE 2026)"
              : "")}
      </Text>
    </View>
  );
};

export default PlanCard;
