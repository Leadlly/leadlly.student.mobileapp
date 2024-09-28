import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const SubscriptionLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="subscription-plans"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="apply-coupon" options={{ headerShown: false }} />
    </Stack>
  );
};

export default SubscriptionLayout;
