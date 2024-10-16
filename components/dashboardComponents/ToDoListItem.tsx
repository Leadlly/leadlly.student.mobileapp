import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TRevisionProps } from "../../types/types";
import { capitalizeFirstLetter } from "../../helpers/utils";
import clsx from "clsx";
import { colors } from "../../constants/constants";

const ToDoListItem = ({
  item,
  setModalVisible,
  completedTopics,
  incompleteTopics,
  setTopic,
}: {
  item: TRevisionProps;
  completedTopics: any[];
  incompleteTopics: any[];
  setModalVisible: (modalVisible: boolean) => void;
  setTopic: (topic: { name: string; _id: string } | null) => void;
}) => {
  const handleTopicPress = (topic: string, topicId: string) => {
    setTopic({ name: topic, _id: topicId });
    setModalVisible(true);
  };

  return (
    <View className="py-2 justify-center">
      <View
        className={clsx(
          "flex-row justify-between items-start",
          completedTopics &&
            completedTopics?.length &&
            completedTopics?.includes(item.topic.name) &&
            "opacity-60"
        )}
      >
        <TouchableOpacity
          className="flex-1 flex-row items-start space-x-3"
          disabled={completedTopics?.includes(item.topic.name)}
          onPress={() => handleTopicPress(item.topic.name, item.topic.id)}
        >
          <View
            className={clsx(
              "w-[18px] h-[18px] rounded border border-checkbox-gray items-center justify-center",
              completedTopics &&
                completedTopics.length > 0 &&
                completedTopics.includes(item.topic.name)
                ? "bg-leadlly-green/20 border-0"
                : incompleteTopics &&
                    incompleteTopics.length > 0 &&
                    incompleteTopics.includes(item.topic.name)
                  ? "bg-leadlly-red/20 border-0"
                  : ""
            )}
          >
            {completedTopics &&
            completedTopics.length > 0 &&
            completedTopics.includes(item.topic.name) ? (
              <Feather name="check" size={14} color={colors.leadllyGreen} />
            ) : incompleteTopics &&
              incompleteTopics.length > 0 &&
              incompleteTopics.includes(item.topic.name) ? (
              <Text className="text-leadlly-red text-sm leading-none font-mada-semibold">
                !
              </Text>
            ) : null}
          </View>
          <Text className="flex-1 text-[15px] font-mada-semibold leading-tight -mt-0.5">
            {capitalizeFirstLetter(item.topic.name)}
          </Text>
        </TouchableOpacity>

        {completedTopics &&
        completedTopics.length > 0 &&
        completedTopics.includes(item.topic.name) ? (
          <Text className="bg-leadlly-green/10 text-leadlly-green px-2 py-1 text-[10px] font-mada-medium rounded ml-3">
            Completed
          </Text>
        ) : incompleteTopics &&
          incompleteTopics.length > 0 &&
          incompleteTopics.includes(item.topic.name) ? (
          <Text className="bg-leadlly-red/10 text-leadlly-red px-2 py-1 text-[10px] font-mada-medium rounded ml-3">
            Incomplete
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default ToDoListItem;
