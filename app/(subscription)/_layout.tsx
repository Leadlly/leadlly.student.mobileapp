import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import LogoutButton from "../../components/manageAccountComponents/LogoutButton";

const SubscriptionLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="subscription-plans"
        options={{
          headerTitle: "Subscription Plans",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "Mada-SemiBold",
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View className="mr-3">
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={22} color="black" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View>
              <LogoutButton />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="apply-coupon"
        options={{
          headerShadowVisible: false,
          headerTitle: "Apply Coupon",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "Mada-SemiBold",
            fontSize: 20,
          },
          headerLeft: () => (
            <View className="mr-3">
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="arrowleft" size={22} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default SubscriptionLayout;
