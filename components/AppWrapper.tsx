import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../services/redux/hooks";
import { loadUser } from "../services/redux/slices/userSlice";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ProtectRoute from "./ProtectRoute";
import { TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import LogoutButton from "./manageAccountComponents/LogoutButton";
import { loadQuizzes } from "../services/redux/slices/weeklyQuizSlice";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import UpgradeButton from "./shared/UpgradeButton";
import { loadDailyQuizzes } from "../services/redux/slices/dailyQuizSlice";
import { useGetUnreadNotifications } from "../services/queries/chatQuery";
import { unreadMessages } from "../services/redux/slices/unreadMessageSlice";

const AppWrapper = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data, isLoading } = useGetUnreadNotifications({
    receiver: user?._id,
    room: user?.email,
  });

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadDailyQuizzes());
    dispatch(loadQuizzes());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) return;

    if (data && data.unreadCount && data.unreadCount.length > 0) {
      const unreadMessagesForUser = data.unreadCount.find(
        (message: { room: string; messageCount: number }) =>
          message.room === user?.email
      );
      dispatch(unreadMessages(unreadMessagesForUser?.messageCount));
    }
  }, [data, isLoading]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProtectRoute>
        <Stack screenOptions={{ headerShadowVisible: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(subscription)"
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
              headerLeft: () => (
                <View className="mr-4">
                  <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={22} color="black" />
                  </TouchableOpacity>
                </View>
              ),
              headerRight: () =>
                user &&
                user.category !== "free" &&
                user.category !== "premium" && <UpgradeButton />,
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
              headerLeft: () => (
                <View className="mr-4">
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
            name="(quiz)/quiz/[quizId]/attempt"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(quiz)/quiz/[quizId]/report"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(error-Notes)"
            options={{
              headerTitle: "Error Notes",
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
            name="errorBook/chapter/[chapterName]/erroredQuestions"
            options={{
              headerTitle: "Error Book",
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
            name="errorBook/chapter/[chapterName]/attempt"
            options={{
              headerTitle: "Attempt Quiz",
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
    </GestureHandlerRootView>
  );
};

export default AppWrapper;
