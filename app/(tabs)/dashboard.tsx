import { ScrollView } from "react-native";
import ToDoList from "../../components/dashboardComponents/ToDoList";
import NewTopicLearnt from "../../components/dashboardComponents/NewTopicLearnt";
import SubjectProgress from "../../components/dashboardComponents/SubjectProgress";
import DailyReport from "../../components/dashboardComponents/DailyReport";
import ProgressAnalytics from "../../components/dashboardComponents/ProgressAnalytics";

const Dashboard = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white px-4 mb-16">
      <ToDoList />
      <NewTopicLearnt />
      <SubjectProgress />
      <DailyReport />
      <ProgressAnalytics />
    </ScrollView>
  );
};

export default Dashboard;
