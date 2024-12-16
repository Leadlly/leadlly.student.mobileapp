import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { MergedPlanData } from "../../types/types";
import clsx from "clsx";
import { useAppSelector } from "../../services/redux/hooks";
import { LinearGradient } from "expo-linear-gradient";

const RefactoredSubscriptionPlanCard = ({
  plan,
}: {
  plan: MergedPlanData | null;
}) => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.3,
        elevation: 2.5,
      }}
      className={clsx(
        "px-7 py-2 rounded-xl mx-5 mb-6",
        plan?.title === "momentum"
          ? "bg-[#FFD9AE]"
          : plan?.title === "consistency"
            ? "bg-[#D8BDFF]"
            : "bg-[#C8FFB6]",
        user &&
          user.subscription.status === "active" &&
          user?.subscription.planId === plan?.planId
          ? "border-4 border-primary"
          : ""
      )}
    >
      <View className="border-b border-tab-item-gray py-2 flex-row items-center justify-between">
        <Text className="flex-1 capitalize text-lg font-mada-Bold leading-6">
          {plan?.title} Plan
        </Text>
        <View className="flex-row items-center space-x-2">
          {plan?.title === "consistency" && (
            <LinearGradient
              colors={["rgba(248, 155, 5, 1)", "rgba(180, 56, 243, 1)"]}
              dither={false}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="items-center justify-center py-1 px-3 rounded-full"
            >
              <Text className="text-[10px] font-mada-Bold leading-4 text-white">
                Most Popular
              </Text>
            </LinearGradient>
          )}

          {user &&
          user.subscription.status === "active" &&
          user.subscription.planId === plan?.planId ? (
            <View className="bg-primary px-3 py-1 rounded-full">
              <Text className="text-xs font-mada-medium text-white">
                Active Plan
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <View className="flex-row items-center space-x-1 pt-3">
        <Text className="text-3xl leading-8 font-mada-Bold">
          ₹
          {Math.round(
            Number(plan?.amount) / Number(plan?.["duration(months)"])
          )}
        </Text>
        <Text className="text-base font-mada-semibold">/ month</Text>
      </View>

      <View className="flex-row items-center space-x-1">
        <Text className="text-xs font-mada-regular">
          {plan?.discountPercentage}% OFF
        </Text>
        <View className="relative">
          <View className="absolute top-1/2 left-0 -translate-y-0.5 -rotate-[6deg] w-16 h-0.5 bg-leadlly-red" />
          <Text className="text-xs font-mada-regular">
            ₹
            {Math.round(
              Number(plan?.initialPrice) / Number(plan?.["duration(months)"])
            )}
            / month
          </Text>
        </View>
      </View>
      <Text className="text-xs font-mada-regular font-bold py-1">
        Valid till:{" "}
        {user?.subscription.status === "active"
          ? new Date(
              new Date(
                user.subscription.dateOfDeactivation || new Date()
              ).getTime() +
                Number(plan?.["duration(months)"]) * 30 * 24 * 60 * 60 * 1000
            ).toLocaleDateString("en-GB", {
              month: "short",
              year: "numeric",
            })
          : `${plan?.["duration(months)"]} month${Number(plan?.["duration(months)"]) > 1 ? "s" : ""}`}
        {user?.subscription.status === "active" &&
          plan?.title === "momentum" &&
          " (1 month)"}
        {user?.subscription.status === "active" &&
          plan?.title === "consistency" &&
          (user?.academic?.competitiveExam === "neet"
            ? " (NEET 2025)"
            : user?.academic?.competitiveExam === "jee"
              ? " (JEE 2025)"
              : "")}
        {user?.subscription.status === "active" &&
          plan?.title === "sturdy-step" &&
          (user?.academic?.competitiveExam === "neet"
            ? " (NEET 2026)"
            : user?.academic?.competitiveExam === "jee"
              ? " (JEE 2026)"
              : "")}
      </Text>

      <Link
        // href={{
        //   pathname: "/apply-coupon",
        //   params: {
        //     category: plan?.category,
        //     planId: plan?.planId,
        //     price: String(plan?.amount),
        //   },
        // }}
        href={"/subscription-end"}
        asChild
      >
        <TouchableOpacity className="bg-black rounded-full h-10 my-2 items-center justify-center">
          <Text className="text-white text-sm font-mada-medium">
            Apply Coupon
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default RefactoredSubscriptionPlanCard;
