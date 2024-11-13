import { View, Text } from "react-native";
import React from "react";
import { TRevisionProps } from "../../types/types";
import { capitalizeFirstLetter } from "../../helpers/utils";
import clsx from "clsx";

const ChapterTopicItem = ({
  item,
  isSubtopics = false,
}: {
  item: TRevisionProps;
  isSubtopics?: boolean;
}) => {
  return (
    <View
      className={clsx(
        "rounded-md px-2 py-1",
        isSubtopics ? "bg-leadlly-cyan/20" : "bg-primary/20 "
      )}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className={clsx(
          "font-mada-semibold capitalize",
          isSubtopics ? "text-leadlly-cyan" : "text-primary"
        )}
      >
        {isSubtopics ? item.topic?.name : item.chapter.name}
      </Text>
      <Text className="font-mada-medium">
        {capitalizeFirstLetter(
          isSubtopics ? item.subtopic?.name : item.topic.name
        )}
      </Text>
    </View>
  );
};

export default ChapterTopicItem;
