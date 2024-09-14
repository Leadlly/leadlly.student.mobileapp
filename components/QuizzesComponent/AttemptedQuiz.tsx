import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AttemptedQuizProps } from "../../types/types";
import { formatDate } from "../../helpers/utils";
import { useAppSelector } from "../../services/redux/hooks";
import { Ionicons } from "@expo/vector-icons";

const AttemptedQuiz: React.FC<{
  quiz: AttemptedQuizProps;
}> = ({ quiz }) => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  return (
    <View className="flex-row rounded-xl border border-gray-300 p-3">
      <View className="flex-1 flex-col justify-start space-y-1">
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-lg font-mada-semibold">{quiz.chapterName}</Text>
          {quiz.completedDate && (
            <Text className="text-sm text-gray-500">
              {formatDate(new Date(quiz.completedDate))}
            </Text>
          )}
        </View>
        <View className="flex-row justify-between flex-1 items-end">
          <View className="flex-1">
            <Text className="text-gray-600 text-xs md:text-sm my-1">
              {quiz.description}
            </Text>
            <View className="mt-5 flex-row items-center gap-2">
              <Text
                className={`text-black text-xs capitalize py-1 px-2 font-mada-medium rounded ${
                  quiz.subject === "maths" || quiz.subject === "biology"
                    ? "bg-[#107FFC30]"
                    : quiz.subject === "physics"
                      ? "bg-[#A36AF53D]"
                      : quiz.subject === "chemistry"
                        ? "bg-[#72EFDD4A]"
                        : ""
                }`}
              >
                {quiz.subject}
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-gray-600 my-1 text-xs font-mada-regular">
              {quiz.questions} Quiz Questions
            </Text>
            <TouchableOpacity
              className="bg-white border px-2 py-1 rounded-md flex-row items-center"
              onPress={() => {
                // Navigate to quiz/${quiz.id}/report
                // You'll need to implement navigation logic here
              }}
            >
              <Text className=" font-mada-semibold text-xs mr-1">
                View Details
              </Text>
              <Ionicons name="chevron-forward" size={12} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttemptedQuiz;
