import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MergedPlanData, UserDataProps } from "../../types/types";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import clsx from "clsx";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, subscriptionFeatures } from "../../constants/constants";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

const SubscriptionPlanCard = ({
  index,
  data,
  scrollX,
  paginationIndex,
  cardWidth,
  user,
}: {
  index: number;
  data: MergedPlanData | null;
  scrollX: SharedValue<number>;
  paginationIndex: number;
  cardWidth: number;
  user: UserDataProps | null;
}) => {
  const webBaseUrl =
    process.env.EXPO_PUBLIC_WEB_APP_URL || "https://education.leadlly.in";

  const userToken = user?.token;

  const redirectUrl = Linking.createURL("subscription-plans");

  const subscriptionUrl = `${webBaseUrl}/subscription-plans/apply-coupon?token=${encodeURIComponent(userToken!)}&redirect=${encodeURIComponent(redirectUrl)}&category=${data?.category}&planId=${data?.planId}&price=${String(data?.amount)}`;

  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [
              (index - 1) * cardWidth,
              index * cardWidth,
              (index + 1) * cardWidth,
            ],
            [-cardWidth * 0.2, 0, cardWidth * 0.2],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [
              (index - 1) * cardWidth,
              index * cardWidth,
              (index + 1) * cardWidth,
            ],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[{ width: cardWidth, paddingBottom: 6 }, rnAnimatedStyle]}
    >
      <View
        style={[{ overflow: "hidden" }, styles.boxShadow]}
        className={clsx(
          "rounded-xl bg-white px-5 py-4 relative mx-10",
          paginationIndex === index && "border border-primary"
        )}
      >
        <View className="absolute -top-5 -right-10 w-40 h-40 bg-primary/5 rounded-full items-center justify-center" />
        <Image
          source={data?.image}
          className="absolute top-7 right-5 w-24 h-24"
          resizeMode="contain"
        />

        <View className="flex-row items-center gap-x-4">
          <Text className="text-xl font-mada-Bold capitalize leading-tight">
            {data?.category} Plan
          </Text>

          {data?.category === "pro" && (
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
        </View>
        <Text className="text-2xl text-primary font-mada-Bold leading-tight my-3">
          ₹ {data?.amount}/-
        </Text>

        <View className="flex-row items-center gap-x-1 mb-4">
          <Text className="text-sm font-mada-semibold leading-tight">
            {data?.discountPercentage}% OFF
          </Text>
          <View className="relative">
            <View className="absolute top-1/2 left-0 -translate-y-0.5 -rotate-12 w-10 h-0.5 bg-leadlly-red" />
            <Text className="text-sm font-mada-semibold leading-tight">
              ₹{data?.initialPrice}/-
            </Text>
          </View>
        </View>

        <View className="space-y-5">
          {subscriptionFeatures.map((feature, index) => (
            <View key={index} className="flex-row items-center gap-x-4">
              <View
                className={clsx(
                  "w-6 h-6 rounded-full items-center justify-center",
                  data?.features.includes(feature)
                    ? "bg-primary/10"
                    : "bg-leadlly-red/10"
                )}
              >
                <Feather
                  name={data?.features.includes(feature) ? "check" : "x"}
                  size={15}
                  color={
                    data?.features.includes(feature)
                      ? colors.primary
                      : colors.leadllyRed
                  }
                />
              </View>
              <Text className="flex-1 text-base font-mada-regular leading-tight">
                {feature}
              </Text>
            </View>
          ))}
        </View>

        <View className="items-center justify-center mt-6 mb-2">
          {/* <Link
            href={{
              pathname: "/apply-coupon",
              params: {
                category: data?.category,
                planId: data?.planId,
                price: String(data?.amount),
              },
            }}
            asChild
          > */}
          <TouchableOpacity
            onPress={async () =>
              await WebBrowser.openBrowserAsync(subscriptionUrl)
            }
            className="bg-primary rounded-lg h-9 w-36 items-center justify-center flex-row gap-x-1.5"
          >
            <MaterialCommunityIcons
              name="ticket-percent"
              size={17}
              color="white"
            />
            <Text className="text-sm text-white font-mada-semibold leading-tight">
              Apply Coupon
            </Text>
          </TouchableOpacity>
          {/* </Link> */}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
});

export default SubscriptionPlanCard;
