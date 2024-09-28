import React from "react";
import { View, Text } from "react-native";
import AttemptAnalysisChart from "./AttemptAnalysisChart";

type AttemptAnalysisProps = {
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
};

const AttemptAnalysis: React.FC<AttemptAnalysisProps> = ({
  correctAnswers,
  incorrectAnswers,
  totalQuestions,
}) => {
  const notAttempted = totalQuestions - (correctAnswers + incorrectAnswers);
  const efficiency = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <View className="shadow-section my-5 p-4 pt-5 rounded-[10px] flex-1 bg-white space-y-5">
      <Text className="text-md font-semibold mb-4 text-[#9E9E9E]">
        Attempt Analysis
      </Text>
      <View className="flex-col items-center justify-between">
        <View className="mb-5 flex justify-center">
          <AttemptAnalysisChart
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            notAttempted={notAttempted}
            efficiency={efficiency}
          />
        </View>
        <View className="w-full flex justify-center">
          <View className="flex-row justify-between items-center gap-2 mb-3 flex-1">
            <View className="w-3 h-3 rounded-sm bg-[#0FD679]" />
            <Text className="text-base font-medium ">Correct Answer</Text>
            <Text className="text-base font-medium">-</Text>
            <Text className="font-medium text-base text-[#939393]">
              +<Text className="text-[#0FD679]">{correctAnswers * 3}</Text>{" "}
              marks ({correctAnswers}Q)
            </Text>
          </View>
          <View className="flex-row justify-between items-center gap-2 mb-3">
            <View className="w-3 h-3 rounded-sm bg-[#E62308]" />
            <Text className="text-base font-medium ">Incorrect Answer</Text>
            <Text className="text-base font-medium">-</Text>
            <Text className="font-medium text-base text-[#939393]">
              <Text className="text-[#E62308]">-{incorrectAnswers}</Text> marks
              ({incorrectAnswers}Q)
            </Text>
          </View>
          <View className="flex-row justify-between items-center gap-2">
            <View className="w-3 h-3 rounded-sm bg-[#9654F41A]" />
            <Text className="text-base font-medium ">Not Attempted</Text>
            <Text className="text-base font-medium">-</Text>
            <Text className="font-medium text-base text-[#939393]">
              <Text className="text-black">0</Text> marks ({notAttempted}Q)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttemptAnalysis;
