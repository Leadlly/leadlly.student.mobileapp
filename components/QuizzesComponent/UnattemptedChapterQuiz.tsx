import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { UnattemptedChapterQuizProps } from "../../types/types";
import { useAppSelector } from "../../services/redux/hooks";
import { Link } from "expo-router";

const UnattemptedChapterQuiz: React.FC<{
  quiz: UnattemptedChapterQuizProps;
}> = ({ quiz }) => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  return (
    <View className="flex-row rounded-xl border border-gray-300 p-3">
      <View className="flex-1 flex-col justify-start space-y-1">
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-lg font-mada-semibold">{quiz.chapterName}</Text>
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
            <Link
              href={{
                pathname: `/quiz/${quiz.id}/attempt`,
              }}
              asChild
            >
              <TouchableOpacity className="bg-primary  px-2 py-1 rounded-md">
                <Text className="text-white font-mada-semibold text-xs">
                  Attempt Now
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UnattemptedChapterQuiz;
