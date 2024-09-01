import { useEffect } from "react";
import { useAppDispatch } from "../services/redux/hooks";
import { loadUser } from "../services/redux/slices/userSlice";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ProtectRoute from "./ProtectRoute";
import { TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const AppWrapper = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <ProtectRoute>
      <Stack screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        <Stack.Screen name="(initial-info)" options={{ headerShown: false }} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(subscription)/subscription-plans"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(profile)/profile"
          options={{
            headerTitle: "Profile",
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontFamily: "Mada-SemiBold",
              fontSize: 20,
            },
            headerLeft: (props) => (
              <View className="mr-4">
                <TouchableOpacity onPress={() => router.back()}>
                  <AntDesign name="arrowleft" size={22} color="black" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="(manage-account)"
          options={{
            headerTitle: "My Account",
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontFamily: "Mada-SemiBold",
              fontSize: 20,
            },
            headerLeft: (props) => (
              <View className="mr-4">
                <TouchableOpacity onPress={() => router.back()}>
                  <AntDesign name="arrowleft" size={22} color="black" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ProtectRoute>
  );
};

export default AppWrapper;
