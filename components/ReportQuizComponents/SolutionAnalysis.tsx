import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Question } from "../../types/types";

type SolutionAnalysisProps = {
  questions: Question[];
};

const SolutionAnalysis: React.FC<SolutionAnalysisProps> = ({ questions }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <View className="flex-1 p-5 bg-white m-5 rounded-[10px] shadow-md">
      <Text className="text-2xl font-semibold mb-4 text-[#9E9E9E]">
        Solution Analysis
      </Text>
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="always"
        scrollEnabled={true}
        nestedScrollEnabled={true}
      >
        {questions.map((question: Question, index: number) => (
          <View key={question._id} className="mb-5">
            <Text className="font-semibold text-[#7C7C7C] text-lg mb-1">{`Question ${index + 1}`}</Text>
            <Text className="font-semibold text-lg mb-2.5">
              {question.question}
            </Text>
            {question.options.map((option, optIndex) => (
              <View
                key={option._id}
                className={`p-4 relative flex-row justify-between items-center mb-2.5 rounded-[6px] border ${
                  option.tag === "correct"
                    ? "border-green-500 bg-green-100"
                    : question.selectedOption === option.tag
                      ? "border-red-500 bg-red-100"
                      : "border-gray-300 bg-gray-50"
                }`}
              >
                <Text className="text-base">{option.name}</Text>
                {(question.selectedOption === option.tag ||
                  option.tag === "correct") && (
                  <Text
                    className={
                      option.tag === "correct"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {option.tag === "correct"
                      ? "Correct answer"
                      : "Wrong answer"}
                  </Text>
                )}
                {option.tag === question.selectedOption && (
                  <View className="absolute -top-2.5 right-[5%]">
                    {question.selectedOption !== "correct" ? (
                      <Ionicons name="close-circle" size={20} color="red" />
                    ) : (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="green"
                      />
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SolutionAnalysis;
