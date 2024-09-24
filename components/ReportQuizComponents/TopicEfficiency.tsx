import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { QuizReportResponse } from "../../types/types";
import { ProgressBar } from "react-native-paper";

const getProgressBarColor = (efficiency: string) => {
  const efficiencyNumber = parseInt(efficiency);
  if (efficiencyNumber < 40) return "#FF0000";
  if (efficiencyNumber < 70) return "#FFA500";
  return "#00FF00";
};

const TopicsEfficiency: React.FC<{ report: QuizReportResponse | null }> = ({ report }) => {
  return (
    <View className="m-5 p-5 rounded-[10px] bg-white shadow-md">
      <Text className="text-xl font-bold mb-4">Topics Efficiency</Text>
      <ScrollView
        className="max-h-52"
        keyboardShouldPersistTaps="always"
        scrollEnabled={true}
        nestedScrollEnabled={true}
      >
        {report?.topicsWithEfficiency.map(({ topic, efficiency }) => (
          <View
            key={topic}
            className="flex-row justify-between items-center mb-3"
          >
            <View className="flex-row items-center space-x-2 w-[40%]">
              <Ionicons name="chevron-down" size={20} color="black" />
              <Text className="text-sm" numberOfLines={1} ellipsizeMode="tail">
                {topic}
              </Text>
            </View>
            <View className="flex-row items-center w-[50%] justify-end">
              <ProgressBar
                progress={parseInt(efficiency) / 100}
                color={getProgressBarColor(efficiency)}
                style={{ width: 120, height: 8 }}
              />
              <Text className="font-semibold text-[#9E9E9E] w-[40px] text-right ml-2">
                {efficiency}%
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopicsEfficiency;
