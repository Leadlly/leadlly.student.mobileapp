import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { WeeklyQuizProps } from "../../types/types";
import { calculateDaysLeft, formatDate } from "../../helpers/utils";
import { useAppSelector } from "../../services/redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { colors } from "../../constants/constants";

const AttemptedWeekQuiz: React.FC<{
  quiz: WeeklyQuizProps;
}> = ({ quiz }) => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  const daysLeft = calculateDaysLeft(new Date(quiz.endDate));

  return (
    <View className="flex-row rounded-xl border border-gray-300 p-3">
      <View className="flex-1 flex-col justify-start space-y-1">
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-lg font-mada-semibold">
            {formatDate(new Date(quiz.createdAt))} -{" "}
            {formatDate(new Date(quiz.endDate))}
          </Text>
        </View>
        <View>
          <View className="flex-1">
            <Text
              ellipsizeMode="tail"
              numberOfLines={8}
              className="text-secondary-text font-mada-regular capitalize text-xs md:text-sm my-1"
            >
              {Object.keys(quiz.questions).join(", ")}
            </Text>
            <View className="flex-row items-center justify-between mt-2">
              <View className="flex-row items-center space-x-2">
                {userSubjects?.map((subject, index) => (
                  <Text
                    key={index}
                    className={`text-black text-[10px] capitalize py-1 px-2 font-mada-medium rounded ${
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
              <Text className="text-secondary-text my-1 text-[10px] font-mada-regular">
                {Object.values(quiz.questions).flat().length} Quiz Questions
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between mt-3">
            <Link
              href={{
                pathname: "/(quiz)/quiz/[quizId]/report",
                params: { quizId: quiz._id },
              }}
              asChild
            >
              <TouchableOpacity className="bg-white border px-2 py-1 rounded-md flex-row items-center">
                <Text className="font-mada-semibold text-xs mr-1">Report</Text>
                <Ionicons
                  name="chevron-forward"
                  size={12}
                  color={colors.iconGray}
                />
              </TouchableOpacity>
            </Link>

            {daysLeft > 0 && (
              <Link
                href={{
                  pathname: "/(quiz)/quiz/[quizId]/attempt",
                  params: { quizId: quiz._id },
                }}
                asChild
              >
                <TouchableOpacity className="bg-white border px-2 py-1 rounded-md flex-row items-center">
                  <Text className="font-mada-semibold text-xs mr-1">
                    Reattempt
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={12}
                    color={colors.iconGray}
                  />
                </TouchableOpacity>
              </Link>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttemptedWeekQuiz;
