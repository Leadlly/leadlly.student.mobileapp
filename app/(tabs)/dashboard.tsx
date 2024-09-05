import { ScrollView, StyleSheet, View } from "react-native";
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

const Dashboard = () => {
  const params = useLocalSearchParams<{
    initialSetup?: string;
  }>();

  const user = useAppSelector((state) => state.user.user);

  return (
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
  );
};

const styles = StyleSheet.create({
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
});

export default Dashboard;
