import React, { useEffect } from "react";
import { useAppDispatch } from "../services/redux/hooks";
import { loadUser } from "../services/redux/slices/userSlice";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ProtectRoute from "./ProtectRoute";

const AppWrapper = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <ProtectRoute>
      <Stack screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ProtectRoute>
  );
};

export default AppWrapper;
