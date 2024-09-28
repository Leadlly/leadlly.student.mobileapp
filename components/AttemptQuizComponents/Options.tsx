import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { TQuizAnswerProps, TQuizQuestionOptionsProps } from "../../types/types";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

interface OptionsProps {
  options: TQuizQuestionOptionsProps[];
  selectedOption: TQuizQuestionOptionsProps | null;
  handleOptionChange: (option: TQuizQuestionOptionsProps) => void;
  attemptedOption?: {
    questionId: string;
    quizId: string;
    topic: { name: string };
    question: TQuizAnswerProps;
  };
}

const Options: React.FC<OptionsProps> = ({
  options,
  selectedOption,
  handleOptionChange,
  attemptedOption,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex  justify-between">
      {options?.map((option) => (
        <TouchableOpacity
          key={option._id}
          className={` border-2 rounded-lg p-4 mb-4 ${
            selectedOption
              ? selectedOption.name === option.name
                ? "border-primary"
                : "border-gray-200"
              : attemptedOption &&
                  attemptedOption.question.studentAnswer === option.name
                ? "border-primary"
                : "border-gray-200"
          }`}
          onPress={() => handleOptionChange(option)}
        >
          <View className="flex-row items-center">
            <View
              className={`w-4 h-4 rounded-full border-2 mr-5 justify-center items-center ${
                selectedOption
                  ? selectedOption.name === option.name
                    ? "border-primary"
                    : "border-gray-400"
                  : attemptedOption &&
                      attemptedOption.question.studentAnswer === option.name
                    ? "border-primary"
                    : "border-gray-400"
              }`}
            >
              {(selectedOption?.name === option.name ||
                (attemptedOption &&
                  attemptedOption.question.studentAnswer === option.name)) && (
                <View className="w-2 h-2 rounded-full bg-primary" />
              )}
            </View>
            <View className="flex-1">
              <View className="flex-1">
                <RenderHtml
                  contentWidth={width - 120}
                  source={{ html: option.name }}
                />
              </View>
              {option.images && (
                <Image
                  source={{ uri: option.images }}
                  className="w-[300px] h-[200px] mt-2"
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Options;
