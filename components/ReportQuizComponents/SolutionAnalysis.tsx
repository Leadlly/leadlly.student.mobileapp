import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SolvedQuestion } from "../../types/types";
import RenderHTML from "react-native-render-html";

const SolutionAnalysis: React.FC<{ questions: SolvedQuestion[] }> = ({
  questions,
}) => {
  const { width } = useWindowDimensions();

  if (!questions || questions.length === 0) return null;

  return (
    <View className="shadow-lg shadow-gray-400 my-6 p-6 rounded-[12px] flex-1 bg-white">
      <Text className="text-2xl font-mada-semibold mb-4 text-secondary-text">
        Solution Analysis
      </Text>
      <ScrollView
        keyboardShouldPersistTaps="always"
        scrollEnabled={true}
        nestedScrollEnabled={true}
      >
        {questions.map((question, index: number) => (
          <View key={question._id} className="mb-5">
            <Text className="font-mada-semibold text-tab-item-gray text-base mb-1">{`Question ${index + 1}`}</Text>
            <View className="mb-2">
              <RenderHTML
                contentWidth={width - 88}
                source={{
                  html: question.question.question,
                }}
              />
            </View>
            {question.question.images &&
              question.question.images.length > 0 && (
                <View className="mb-2.5">
                  {question.question.images.map((image, imgIndex) => (
                    <Image
                      key={imgIndex}
                      source={{ uri: image.url }}
                      style={{
                        width: width - 88,
                        height: 200,
                        resizeMode: "contain",
                      }}
                      className="mb-2.5"
                    />
                  ))}
                </View>
              )}
            {question.question.options.map((option) => (
              <View
                key={option._id}
                className={`px-4 py-2 relative flex-row justify-between items-center mb-2.5 rounded-[6px] border ${
                  option.tag === "Correct"
                    ? "border-green-500 bg-green-100"
                    : question.studentAnswer === option.name
                      ? "border-red-500 bg-red-100"
                      : "border-gray-300 bg-gray-50"
                }`}
              >
                <View className="flex-1">
                  <View>
                    <RenderHTML
                      contentWidth={width - 120}
                      source={{ html: option.name }}
                    />
                  </View>
                  {option.images && option.images.length > 0 && (
                    <View className="mt-2">
                      {option.images.map((image, imgIndex) => (
                        <Image
                          key={imgIndex}
                          source={{ uri: image.url }}
                          style={{
                            width: "100%",
                            height: 100,
                            resizeMode: "contain",
                          }}
                          className="mb-2"
                        />
                      ))}
                    </View>
                  )}
                </View>
                {(question.studentAnswer === option.name ||
                  option.tag === "Correct") && (
                  <Text
                    className={`font-mada-medium text-sm ${
                      option.tag === "Correct"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {option.tag === "Correct"
                      ? "Correct answer"
                      : "Wrong answer"}
                  </Text>
                )}
                {option.name === question.studentAnswer && (
                  <View className="absolute -top-2 right-[5%]">
                    {question.isCorrect ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={15}
                        style={{ backgroundColor: "white", borderRadius: 100 }}
                        color="green"
                      />
                    ) : (
                      <Ionicons
                        name="close-circle"
                        size={15}
                        color="red"
                        style={{ backgroundColor: "white", borderRadius: 100 }}
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
