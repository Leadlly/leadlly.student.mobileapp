import React from "react";
import { View, Text } from "react-native";
import AttemptAnalysisChart from "./AttemptAnalysisChart";

type AttemptAnalysisProps = {
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  efficiency: number;
};

const AttemptAnalysis: React.FC<AttemptAnalysisProps> = ({
  correctAnswers,
  incorrectAnswers,
  totalQuestions,
  efficiency,
}) => {
  const notAttempted = totalQuestions - (correctAnswers + incorrectAnswers);

  return (
    <View className="shadow-lg shadow-gray-400 my-5 p-4 pt-5 rounded-[10px] flex-1 bg-white space-y-5">
      <Text className="text-md font-mada-semibold mb-4 text-[#9E9E9E]">
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
        <View className="w-full flex justify-center pt-5">
          <View className="flex-row justify-between items-center mb-3 gap-2">
            <View className="w-3 h-3 rounded-sm bg-[#0FD679]" />
            <Text className="text-base font-mada-medium flex-1">Correct Answer</Text>
            <Text className="text-base font-mada-medium">-</Text>
            <Text className="font-mada-medium text-base text-[#939393] flex-1 text-right">
              <Text className="text-[#0FD679]">+{correctAnswers * 4}</Text>{" "}
              marks ({correctAnswers}Q)
            </Text>
          </View>
          <View className="flex-row justify-between items-center mb-3 gap-2">
            <View className="w-3 h-3 rounded-sm bg-[#E62308]" />
            <Text className="text-base font-mada-medium flex-1">Incorrect Answer</Text>
            <Text className="text-base font-mada-medium">-</Text>
            <Text className="font-mada-medium text-base text-[#939393] flex-1 text-right">
              <Text className="text-[#E62308]">-{incorrectAnswers}</Text> marks
              ({incorrectAnswers}Q)
            </Text>
          </View>
          <View className="flex-row justify-between items-center gap-2">
            <View className="w-3 h-3 rounded-sm bg-[#9654F41A]" />
            <Text className="text-base font-mada-medium flex-1">Not Attempted</Text>
            <Text className="text-base font-mada-medium">-</Text>
            <Text className="font-mada-medium text-base text-[#939393] flex-1 text-right">
              <Text className="text-black">0</Text> marks ({notAttempted}Q)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttemptAnalysis;
