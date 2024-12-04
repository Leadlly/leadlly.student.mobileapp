import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TRevisionProps } from "../../types/types";
import { capitalizeFirstLetter } from "../../helpers/utils";
import clsx from "clsx";
import { colors } from "../../constants/constants";
import { useAppSelector } from "../../services/redux/hooks";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const ToDoListItem = ({
  item,
  setModalVisible,
  completedTopics,
  incompleteTopics,
  setTopic,
  isSubtopic = false,
  totalQuestions,
}: {
  item: TRevisionProps;
  completedTopics: any[];
  incompleteTopics: any[];
  setModalVisible: (modalVisible: boolean) => void;
  setTopic: (
    topic: { name: string; _id: string; isSubtopic: boolean } | null
  ) => void;
  isSubtopic?: boolean;
  totalQuestions: number;
}) => {
  const { dailyQuizzes } = useAppSelector((state) => state.dailyQuizzes);

  const dailyQuizCurrentTopic = dailyQuizzes.find(
    (quiz) =>
      quiz.topicName === (isSubtopic ? item.subtopic.name : item.topic.name)
  );

  const handleTopicPress = (
    topic: string,
    topicId: string,
    isSubtopic: boolean
  ) => {
    setTopic({ name: topic, _id: topicId, isSubtopic });
    setModalVisible(true);
  };

  return (
    <View className="py-2 justify-center">
      <View
        className={clsx(
          "flex-row justify-between items-start",
          completedTopics &&
            completedTopics?.length &&
            completedTopics?.includes(
              isSubtopic ? item.subtopic.id : item.topic.id
            ) &&
            "opacity-60"
        )}
      >
        <TouchableOpacity
          className="flex-1 flex-row items-start space-x-3"
          disabled={completedTopics?.includes(
            isSubtopic ? item.subtopic.id : item.topic.id
          )}
          onPress={() =>
            handleTopicPress(
              isSubtopic ? item.subtopic.name : item.topic.name,
              isSubtopic ? item.subtopic.id : item.topic.id,
              isSubtopic ? true : false
            )
          }
        >
          {incompleteTopics &&
          incompleteTopics.length > 0 &&
          incompleteTopics.includes(
            isSubtopic ? item.subtopic.id : item.topic.id
          ) ? (
            <AnimatedCircularProgress
              size={18}
              fill={
                dailyQuizCurrentTopic?.attemptedQuestions.length
                  ? dailyQuizCurrentTopic.attemptedQuestions.length >= 10
                    ? dailyQuizCurrentTopic.attemptedQuestions.length
                    : dailyQuizCurrentTopic.attemptedQuestions.length * 10
                  : 0
              }
              width={2}
              rotation={360}
              lineCap="round"
              backgroundColor={"#ff2e2e33"}
              tintColor={colors.leadllyRed}
            >
              {(fill) => (
                <Text className="text-[7px] font-mada-medium text-leadlly-red">
                  {dailyQuizCurrentTopic?.attemptedQuestions.length &&
                  dailyQuizCurrentTopic?.attemptedQuestions.length >= 10
                    ? fill
                    : fill / 10}
                  /{totalQuestions}
                </Text>
              )}
            </AnimatedCircularProgress>
          ) : (
            <View
              className={clsx(
                "w-[18px] h-[18px] rounded border border-checkbox-gray items-center justify-center",
                completedTopics &&
                  completedTopics.length > 0 &&
                  completedTopics.includes(
                    isSubtopic ? item.subtopic.id : item.topic.id
                  ) &&
                  "bg-leadlly-green/20 border-0"
              )}
            >
              {completedTopics &&
              completedTopics.length > 0 &&
              completedTopics.includes(
                isSubtopic ? item.subtopic.id : item.topic.id
              ) ? (
                <Feather name="check" size={14} color={colors.leadllyGreen} />
              ) : null}
            </View>
          )}
          <Text className="flex-1 text-[15px] font-mada-semibold leading-tight -mt-0.5">
            {capitalizeFirstLetter(
              isSubtopic ? item.subtopic.name : item.topic.name
            )}
          </Text>
        </TouchableOpacity>

        {completedTopics &&
        completedTopics.length > 0 &&
        completedTopics.includes(
          isSubtopic ? item.subtopic.id : item.topic.id
        ) ? (
          <Text className="bg-leadlly-green/10 text-leadlly-green px-2 py-1 text-[8px] font-mada-medium rounded ml-3">
            Completed
          </Text>
        ) : incompleteTopics &&
          incompleteTopics.length > 0 &&
          incompleteTopics.includes(
            isSubtopic ? item.subtopic.id : item.topic.id
          ) ? (
          <Text className="bg-leadlly-red/10 text-leadlly-red px-2 py-1 text-[8px] font-mada-medium rounded ml-3">
            Incomplete
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default ToDoListItem;
