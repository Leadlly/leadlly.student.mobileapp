import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import {
  UnattemptedChapterQuizProps,
  WeeklyQuizProps,
} from "../../../types/types";
import TabNavItem from "../../../components/QuizzesComponent/TabNavItem";
import UnattemptedWeeklyQuizzes from "../../../components/QuizzesComponent/UnattemptedWeeklyQuizzes";
import CustomizedQuiz from "../../../components/QuizzesComponent/CustomizedQuiz";
import UnattemptedChapterWiseQuizzes from "../../../components/QuizzesComponent/UnattemptedChapterWiseQuizzes";
import { useGetWeeklyQuiz } from "../../../services/queries/WekklyQuizqueries";

const unattemptedTabs = [
  { id: "weeklyQuiz", label: "Weekly Quiz", mobileOnly: false },
  { id: "chapterQuiz", label: "Chapter Quiz", mobileOnly: false },
  { id: "customizedQuiz", label: "Custom Quiz", mobileOnly: true },
];

const Unattempted = () => {
  const [chapterQuizzes] = useState<UnattemptedChapterQuizProps[]>([]);
  const [activeTab, setActiveTab] = useState("weeklyQuiz");
  const {
    data,
    error,
    isLoading,
  } = useGetWeeklyQuiz("unattempted");
  
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#9654F4" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4 pb-20">
      <View className="py-2 border rounded-xl flex-1   border-gray-300">
        <View className="flex-row justify-around px-4">
          {unattemptedTabs.map((tab) => (
            <TabNavItem
              key={tab.id}
              id={tab.id}
              label={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </View>

        <View className="h-px bg-gray-300 my-3" />

        <View className=" flex-1 min-h-[60vh] ">
          {activeTab === "weeklyQuiz" && (
            <UnattemptedWeeklyQuizzes quizzes={data?.weeklyQuizzes} />
          )}
          {activeTab === "chapterQuiz" && (
            <UnattemptedChapterWiseQuizzes quizzes={chapterQuizzes} />
          )}
          {activeTab === "customizedQuiz" && (
            <View className="items-center lg:hidden">
              <CustomizedQuiz />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Unattempted;
