import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import Input from "../../components/shared/Input";
import { Circle, ClipPath, Defs, Line, Rect, Svg } from "react-native-svg";
import { colors } from "../../constants/constants";

const ApplyCoupon = () => {
  const router = useRouter();
  const { category, planId } = useLocalSearchParams<{
    category: string;
    planId: string;
  }>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5">
        <TouchableOpacity onPress={() => router.back()} className="py-4">
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <View className="relative h-56 bg-white border border-primary rounded-xl justify-between">
          <View
            style={{ transform: [{ translateY: -20 }] }}
            className="absolute top-1/2 -left-6 bg-white rounded-full w-10 h-10 border border-primary"
          />
          <View
            style={{ transform: [{ translateY: -20 }] }}
            className="absolute top-1/2 -right-6 bg-white rounded-full w-10 h-10 border border-primary"
          />

          <View className="absolute top-1/2 left-0 -z-10 w-full border-b border-dashed border-tab-item-gray" />

          <View className="flex-row items-center justify-between px-8 pt-2">
            <View className="flex-1">
              <Text className="text-xl font-mada-Bold">Get</Text>
              <View className="relative">
                <Text
                  style={{ transform: [{ translateY: -15 }] }}
                  className="absolute top-1/2 text-5xl font-mada-ExtraBold text-primary/10 whitespace-nowrap"
                >
                  50%
                </Text>
                <Text className="text-2xl font-mada-semibold text-primary">
                  50% OFF
                </Text>
              </View>
              <Text className="text-xl font-mada-Bold">for 12-months</Text>
            </View>

            <Image
              source={require("../../assets/images/dayflow_gifts.png")}
              resizeMode="contain"
              className="w-24 h-24"
            />
          </View>

          <View className="px-8 pb-5">
            <Text className="text-xs font-mada-semibold leading-10 text-secondary-text">
              Use coupon code :
            </Text>
            <Input
              placeholder="Enter the Coupon"
              placeholderTextColor="gray"
              inputStyle="text-base h-12"
              containerStyle="px-3 border-dashed bg-primary/5"
            />
          </View>
        </View>

        <View className="items-center justify-center py-6">
          <Text className="text-xl leading-6 font-mada-semibold">
            New Offers
          </Text>
        </View>

        <View className="relative h-32 bg-white rounded-xl justify-between border border-input-border">
          <View
            style={{ transform: [{ translateY: -17 }] }}
            className="absolute top-1/2 -left-5 bg-white rounded-full w-8 h-8 border border-input-border"
          />
          <View
            style={{ transform: [{ translateY: -17 }] }}
            className="absolute top-1/2 -right-5 bg-white rounded-full w-8 h-8 border border-input-border"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
});

export default ApplyCoupon;
