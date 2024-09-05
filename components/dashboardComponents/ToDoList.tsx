import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  getFormattedDate,
  getTodaysDay,
  getTodaysFormattedDate,
} from "../../helpers/utils";
import QuestionsModal from "./QuestionsModal";
import { useGetUserPlanner } from "../../services/queries/plannerQuery";
import { TDayProps } from "../../types/types";
import ToDoListItem from "./ToDoListItem";
import { colors } from "../../constants/constants";
import LottieView from "lottie-react-native";

const ToDoList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [todaysTopics, setTodaysTopics] = useState<TDayProps | null>(null);

  const animation = useRef<LottieView>(null);

  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useGetUserPlanner();

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
    <View className="h-72 rounded-xl p-4 bg-primary/5 my-1.5">
      {isLoading || isFetching ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"small"} color={colors.primary} />
        </View>
      ) : (
        <>
          {todaysTopics &&
          (todaysTopics.backRevisionTopics.length > 0 ||
            todaysTopics?.continuousRevisionTopics.length > 0) ? (
            <>
              <View className="mb-3">
                <Text className="text-xl leading-tight font-mada-Bold text-primary">
                  Todo List
                </Text>
                <Text className="text-sm leading-tight font-mada-semibold text-tab-item-gray">
                  {getTodaysDay()} {getTodaysFormattedDate()}
                </Text>
              </View>
              <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                className="flex-1 space-y-4"
              >
                {todaysTopics.backRevisionTopics.map((item) => (
                  <ToDoListItem
                    key={item._id}
                    item={item}
                    setModalVisible={setModalVisible}
                  />
                ))}
                {todaysTopics.continuousRevisionTopics.map((item) => (
                  <ToDoListItem
                    key={item._id}
                    item={item}
                    setModalVisible={setModalVisible}
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
                  ref={animation}
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

      <QuestionsModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </View>
  );
};

export default ToDoList;
