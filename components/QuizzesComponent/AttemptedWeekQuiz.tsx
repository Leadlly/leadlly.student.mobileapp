import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { WeeklyQuizProps } from "../../types/types";
import { formatDate } from "../../helpers/utils";
import { useAppSelector } from "../../services/redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const AttemptedWeekQuiz: React.FC<{
  quiz: WeeklyQuizProps;
}> = ({ quiz }) => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  return (
    <View className="flex-row rounded-xl border border-gray-300 p-3">
      <View className="flex-1 flex-col justify-start space-y-1">
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-lg font-mada-semibold">
            {formatDate(new Date(quiz.startDate))} -{" "}
            {formatDate(new Date(quiz.endDate))}
          </Text>
        </View>
        <View className="flex-row justify-between flex-1 items-end">
          <View className="flex-1">
            <Text className="text-gray-600 text-xs md:text-sm my-1">
              {Object.keys(quiz.questions).slice(0, 10).join(", ")}
              {Object.keys(quiz.questions).length > 10 ? "..." : "."}
            </Text>
            <View className="mt-5 flex-row items-center gap-2">
              {userSubjects?.map((subject, index) => (
                <Text
                  key={index}
                  className={`text-black text-xs capitalize py-1 px-2 font-mada-medium rounded ${
                    subject.name === "maths" || subject.name === "biology"
                      ? "bg-[#107FFC30]"
                      : subject.name === "physics"
                        ? "bg-[#A36AF53D]"
                        : subject.name === "chemistry"
                          ? "bg-[#72EFDD4A]"
                          : ""
                  }`}
                >
                  {subject.name}
                </Text>
              ))}
            </View>
          </View>
          <View className="items-end">
            <Text className="text-gray-600 my-1 text-xs font-mada-regular">
              {Object.values(quiz.questions).flat().length} Quiz Questions
            </Text>
            <Link
              href={{
                pathname: "/(quiz)/quiz/[quizId]/report",
                params: { quizId: quiz._id },
              }}
              asChild
            >
              <TouchableOpacity className="bg-white border px-2 py-1 rounded-md flex-row items-center">
                <Text className="font-mada-semibold text-xs mr-1">
                  View Details
                </Text>
                <Ionicons name="chevron-forward" size={12} color="black" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttemptedWeekQuiz;
