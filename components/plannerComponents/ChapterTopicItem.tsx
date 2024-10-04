import { View, Text, Dimensions } from "react-native";
import React from "react";
import { TRevisionProps } from "../../types/types";
import { capitalizeFirstLetter } from "../../helpers/utils";

const ChapterTopicItem = ({ item }: { item: TRevisionProps }) => {
  return (
    <View className="bg-primary/30 rounded-md px-2 py-1">
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-primary font-mada-semibold capitalize"
      >
        {item.chapter.name}
      </Text>
      <Text className="font-mada-medium leading-tight">
        {capitalizeFirstLetter(item.topic.name)}
      </Text>
    </View>
  );
};

export default ChapterTopicItem;
