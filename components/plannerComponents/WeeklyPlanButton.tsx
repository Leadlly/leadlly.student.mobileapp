import { View, Text, Pressable } from "react-native";
import {
  capitalizeFirstLetter,
  getFormattedDate,
  getTodaysFormattedDate,
} from "../../helpers/utils";
import { TDayProps, TRevisionProps } from "../../types/types";

const WeeklyPlanButton = ({
  item,
  borderColor,
  onPress,
}: {
  item: TDayProps;
  onPress: () => void;
  borderColor: string;
}) => {
  return (
    <Pressable
      key={item._id}
      className="my-2"
      style={[
        getFormattedDate(new Date(item.date)) === getTodaysFormattedDate()
          ? { borderWidth: 0 }
          : { borderWidth: 1.5 },
        { borderColor, borderRadius: 13 },
      ]}
      onPress={onPress}
    >
      <View
        className={`rounded-xl overflow-hidden ${
          getFormattedDate(new Date(item.date)) === getTodaysFormattedDate()
            ? "bg-primary"
            : "bg-transparent"
        }`}
      >
        <View className="px-5 flex-row justify-between border-b border-b-input-border py-2">
          <Text
            className={`text-[17px] leading-tight font-mada-Bold ${
              getFormattedDate(new Date(item.date)) === getTodaysFormattedDate()
                ? "text-white"
                : "text-black"
            }`}
          >
            {item.day}
          </Text>
          <Text
            className={`text-[17px] font-mada-medium leading-tight ${
              getFormattedDate(new Date(item.date)) === getTodaysFormattedDate()
                ? "text-white"
                : "text-black"
            }`}
          >
            {getFormattedDate(new Date(item.date))}
          </Text>
        </View>
        <View className="py-2 px-5 w-full">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={`w-full text-base font-mada-regular leading-tight ${
              getFormattedDate(new Date(item.date)) === getTodaysFormattedDate()
                ? "text-white"
                : "text-black"
            }`}
          >
            {item.backRevisionTopics.length > 0 ||
            item.continuousRevisionTopics.length > 0 ? (
              <>
                {item.backRevisionTopics
                  .map((topics: TRevisionProps) =>
                    capitalizeFirstLetter(topics.topic.name)
                  )
                  .join(" / ")}
                {item.backRevisionTopics.length > 0 &&
                  item.continuousRevisionTopics.length > 0 &&
                  " / "}
                {item.continuousRevisionTopics
                  .map((topics: TRevisionProps) =>
                    capitalizeFirstLetter(topics.topic.name)
                  )
                  .join(" / ")}
                {(item.backRevisionTopics.length > 0 ||
                  item.continuousRevisionTopics.length > 0) &&
                  item.continuousRevisionSubTopics.length > 0 &&
                  " / "}
                {item.continuousRevisionSubTopics
                  .map((subtopics: TRevisionProps) =>
                    capitalizeFirstLetter(subtopics.subtopic.name)
                  )
                  .join(" / ")}
              </>
            ) : (
              <>No topics</>
            )}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default WeeklyPlanButton;
