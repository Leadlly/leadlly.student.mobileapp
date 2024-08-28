import { View, Text, Pressable } from "react-native";
import React from "react";
import { TRevisionProps } from "../../types/types";

const ToDoListItem = ({
  item,
  setModalVisible,
}: {
  item: TRevisionProps;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
  return (
    <View className="flex-row justify-between items-start flex-1">
      <Pressable
        className="flex-1 flex-row items-start space-x-3"
        onPress={() => setModalVisible(true)}>
        <View className="w-5 h-5 rounded border-2 border-checkbox-gray"></View>
        <Text className="text-base font-mada-semibold leading-tight">
          {item.topic.name}
        </Text>
      </Pressable>
      <Text className="bg-leadlly-green/10 text-leadlly-green px-2 py-1 text-[10px] rounded ml-3">
        Completed
      </Text>
    </View>
  );
};

export default ToDoListItem;
