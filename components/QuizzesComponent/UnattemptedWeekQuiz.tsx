import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { WeeklyQuizProps } from "../../types/types";
import { useAppSelector } from "../../services/redux/hooks";
import { calculateDaysLeft, formatDate } from "../../helpers/utils";
import { Link } from "expo-router";

type UnattemptedWeekQuizProps = {
  quiz: WeeklyQuizProps;
};

const UnattemptedWeekQuiz: React.FC<UnattemptedWeekQuizProps> = ({ quiz }) => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  const daysLeft = calculateDaysLeft(new Date(quiz.endDate));

  return (
    <View className="rounded-lg border border-gray-300 p-3">
      <View className="flex-1 flex-col justify-start space-y-1">
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-lg font-mada-semibold">
            {formatDate(new Date(quiz.createdAt))} -{" "}
            {formatDate(new Date(quiz.endDate))}
          </Text>
          {daysLeft <= 0 ? (
            <Text className="text-xs font-mada-regular text-red-800 font-medium">
              Quiz closed
            </Text>
          ) : daysLeft <= 1 ? (
            <Text className="text-xs font-mada-regular text-orange-600">
              Quiz closes soon
            </Text>
          ) : (
            <Text className="text-xs font-mada-regular text-primary max-w-[50%] text-right">
              Remaining {daysLeft} days to Take Quiz
            </Text>
          )}
        </View>
        <View>
          <Text className="text-gray-600 text-xs md:text-sm mb-3 capitalize">
            {Object.keys(quiz.questions).slice(0, 10).join(", ")}
            {Object.keys(quiz.questions).length > 10 ? "..." : "."}
          </Text>

          <View className="items-end">
            <Text className="text-gray-600 my-1 text-[10px] font-mada-regular">
              {Object.values(quiz.questions).flat().length} Quiz Questions
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              {userSubjects?.map((subject, index) => (
                <Text
                  key={index}
                  className={`text-black text-[10px]  capitalize py-1 px-2 font-mada-medium  rounded ${
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
            {daysLeft > 0 && (
              <View className="flex-row items-center justify-between">
                <Link
                  href={{
                    pathname: `/quiz/${quiz._id}/attempt`,
                  }}
                  asChild
                >
                  <TouchableOpacity className="bg-primary h-8 items-center justify-center px-3 rounded-md">
                    <Text className="text-white font-mada-semibold text-xs">
                      Attempt Now
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default UnattemptedWeekQuiz;
