import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import {
  getFormattedDate,
  getTodaysDay,
  getTodaysFormattedDate,
} from "../../helpers/utils";
import QuestionsModal from "./QuestionsModal";
import { useGetUserPlanner } from "../../services/queries/plannerQuery";
import { TDayProps } from "../../types/types";
import ToDoListItem from "./ToDoListItem";
import LottieView from "lottie-react-native";
import DashboardSkeletonLoader from "./DashboardSkeletonLoader";

const ToDoList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [todaysTopics, setTodaysTopics] = useState<TDayProps | null>(null);
  const [topic, setTopic] = useState<{
    name: string;
    _id: string;
    isSubtopic: boolean;
  } | null>(null);

  const { data, isLoading, isFetching, isSuccess } = useGetUserPlanner();

  useEffect(() => {
    if (!data) return;

    if (data && data.data && data.data.days.length > 0 && isSuccess) {
      setTodaysTopics(
        data.data.days.filter(
          (item) =>
            getFormattedDate(new Date(item.date)) ===
            getFormattedDate(new Date(Date.now()))
        )[0]
      );
    }
  }, [data, isSuccess]);

  return (
    <View className="rounded-xl py-4 bg-primary/5 my-1.5">
      {isLoading || isFetching ? (
        <View className="h-52 px-4">
          <DashboardSkeletonLoader />
        </View>
      ) : (
        <>
          {todaysTopics &&
          (todaysTopics.backRevisionTopics.length > 0 ||
            todaysTopics?.continuousRevisionTopics.length > 0 ||
            todaysTopics?.continuousRevisionSubTopics.length > 0) ? (
            <>
              <View className="mb-1.5 px-4">
                <Text className="text-xl leading-tight font-mada-Bold text-primary">
                  Todo List
                </Text>
                <Text className="text-sm leading-tight font-mada-semibold text-tab-item-gray">
                  {getTodaysDay()} {getTodaysFormattedDate()}
                </Text>
              </View>
              <ScrollView
                nestedScrollEnabled
                persistentScrollbar
                className="flex-1 space-y-4 px-4 max-h-48"
              >
                {todaysTopics.backRevisionTopics.map((item) => (
                  <ToDoListItem
                    key={item._id}
                    item={item}
                    setModalVisible={setModalVisible}
                    setTopic={setTopic}
                    completedTopics={todaysTopics.completedTopics}
                    incompleteTopics={todaysTopics.incompletedTopics}
                  />
                ))}
                {todaysTopics.continuousRevisionTopics.map((item) => (
                  <ToDoListItem
                    key={item._id}
                    item={item}
                    setModalVisible={setModalVisible}
                    setTopic={setTopic}
                    completedTopics={todaysTopics.completedTopics}
                    incompleteTopics={todaysTopics.incompletedTopics}
                  />
                ))}
                {todaysTopics.continuousRevisionSubTopics.map((item) => (
                  <ToDoListItem
                    key={item._id}
                    item={item}
                    setModalVisible={setModalVisible}
                    setTopic={setTopic}
                    completedTopics={todaysTopics.completedTopics}
                    incompleteTopics={todaysTopics.incompletedTopics}
                    isSubtopic={true}
                  />
                ))}
              </ScrollView>
            </>
          ) : (
            <View className="flex-1 justify-center px-5 space-y-5">
              <Text className="text-xl text-primary font-mada-Bold leading-tight">
                Please hold on...
              </Text>
              <Text className="text-sm leading-tight font-mada-regular text-tab-item-gray">
                While your plan is being generated, your itinerary will be ready
                shortly.
              </Text>

              <View className="items-center justify-center">
                <LottieView
                  source={require("../../assets/todo_pending_animation.json")}
                  autoPlay
                  style={{
                    width: 100,
                    height: 120,
                  }}
                />
              </View>
            </View>
          )}
        </>
      )}

      {modalVisible && (
        <QuestionsModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          questions={todaysTopics?.questions?.[topic?.name!]}
          topic={topic}
        />
      )}
    </View>
  );
};

export default ToDoList;
