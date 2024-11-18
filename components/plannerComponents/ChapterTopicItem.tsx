import { View, Text } from "react-native";
import React from "react";
import { TChapterRevisionProps, TRevisionProps } from "../../types/types";
import { capitalizeFirstLetter } from "../../helpers/utils";
import clsx from "clsx";

const ChapterTopicItem = ({
  item,
  item2,
  isSubtopics = false,
  isChapter = false,
}: {
  item?: TRevisionProps;
  item2?: TChapterRevisionProps;
  isSubtopics?: boolean;
  isChapter?: boolean;
}) => {
  return (
    <View
      className={clsx(
        "rounded-md px-2 py-1",
        isChapter
          ? "bg-primary/20"
          : isSubtopics
            ? "bg-leadlly-cyan/20"
            : "bg-leadlly-yellow/20 "
      )}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className={clsx(
          "font-mada-semibold capitalize",
          isChapter
            ? "text-primary text-xs leading-5"
            : isSubtopics
              ? "text-leadlly-cyan"
              : "text-leadlly-yellow"
        )}
      >
        {isChapter
          ? "Chapter Name"
          : isSubtopics
            ? item?.topic?.name
            : item?.chapter.name}
      </Text>
      <Text className="font-mada-medium">
        {capitalizeFirstLetter(
          isChapter
            ? item2?.name
            : isSubtopics
              ? item?.subtopic?.name
              : item?.topic.name
        )}
      </Text>
    </View>
  );
};

export default ChapterTopicItem;
