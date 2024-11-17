import { View, Text } from "react-native";
import React from "react";
import { TChapterRevisionProps } from "../../types/types";

const ChapterItem = ({ item }: { item: TChapterRevisionProps }) => {
  return (
    <View className="rounded-md px-2 py-1 bg-primary/20 items-center justify-center">
      <Text className="font-mada-semibold capitalize text-primary">
        {item.name}
      </Text>
    </View>
  );
};

export default ChapterItem;
