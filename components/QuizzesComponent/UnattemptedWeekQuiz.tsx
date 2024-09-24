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
    <View className="flex-row   rounded-xl border border-gray-300  p-3">
      <View className="flex-1 flex-col justify-start space-y-1">
        <View className="w-full flex-row items-center justify-between ">
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
        <View className="flex-row justify-between  flex-1 items-end ">
          <View className="flex-1 ">
            <Text className="text-gray-600 text-xs md:text-sm my-1 capitalize">
              {Object.keys(quiz.questions).slice(0, 10).join(", ")}
              {Object.keys(quiz.questions).length > 10 ? "..." : "."}
            </Text>
            <View className="mt-5  flex-row items-center gap-2">
              {userSubjects?.map((subject, index) => (
                <Text
                  key={index}
                  className={`text-black text-xs  capitalize py-1 px-2 font-mada-medium  rounded ${
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
            {daysLeft > 0 && (
              <Link
                href={{
                  pathname: `/quiz/${quiz._id}/attempt`,
                }}
                asChild
              >
                <TouchableOpacity className="bg-primary  px-2 py-1 rounded-md">
                  <Text className="text-white font-mada-semibold text-xs">
                    Attempt Now
                  </Text>
                </TouchableOpacity>
              </Link>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default UnattemptedWeekQuiz;
