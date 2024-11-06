import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import ToDoList from "../../components/dashboardComponents/ToDoList";
import NewTopicLearnt from "../../components/dashboardComponents/NewTopicLearnt";
import SubjectProgress from "../../components/dashboardComponents/SubjectProgress";
import DailyReport from "../../components/dashboardComponents/DailyReport";
import ProgressAnalytics from "../../components/dashboardComponents/ProgressAnalytics";
import { useLocalSearchParams } from "expo-router";
import InitialSetupInfoModal from "../../components/dashboardComponents/InitialSetupInfoModal";
import InitialTodoBox from "../../components/dashboardComponents/InitialTodoBox";
import { useAppSelector } from "../../services/redux/hooks";
import { BlurView } from "expo-blur";
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "../../helpers/registerForPushNotificationsAsync";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSavePushToken } from "../../services/queries/notificationQuery";
import { colors } from "../../constants/constants";
import ReloadApp from "../../components/shared/ReloadApp";
import useAppStateChange from "../../hooks/useAppStateChange";

const Dashboard = () => {
  const currentAppState = useAppStateChange();

  const params = useLocalSearchParams<{
    initialSetup?: string;
    isRedirectedAfterSubscription?: string;
  }>();

  console.log(
    "isRedirectedAfterSubscription====> ",
    params.isRedirectedAfterSubscription
  );

  const user = useAppSelector((state) => state.user.user);

  const { mutateAsync: savePushToken, isPending: savingPushToken } =
    useSavePushToken();

  useEffect(() => {
    const getPushToken = async () => {
      const pushTokenString = await registerForPushNotificationsAsync();
      const storedPushToken = await AsyncStorage.getItem("pushTokenInfo");

      if (pushTokenString !== storedPushToken) {
        await savePushToken({ pushToken: pushTokenString });
        await AsyncStorage.setItem("pushTokenInfo", pushTokenString);
      }
    };

    getPushToken();
  }, []);

  if (params.isRedirectedAfterSubscription === "true") {
    return (
      <ReloadApp
        isRedirected={params.isRedirectedAfterSubscription}
        user={user}
      />
    );
  }

  return (
    <>
      {savingPushToken ? (
        <View className="flex-1 bg-white mb-16 items-center justify-center">
          <ActivityIndicator size={15} color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 bg-white px-4 mb-16"
        >
          {user && user.planner === false ? <InitialTodoBox /> : <ToDoList />}

          <View className="flex-1 relative">
            {user && user.planner === false && (
              <BlurView intensity={10} style={styles.blurOverlay} />
            )}
            <NewTopicLearnt />
          </View>

          <SubjectProgress />
          <DailyReport />
          <ProgressAnalytics />

          <InitialSetupInfoModal params={params} />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
});

export default Dashboard;
