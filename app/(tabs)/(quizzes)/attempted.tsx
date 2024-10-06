import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { AttemptedQuizProps, WeeklyQuizProps } from "../../../types/types";
import TabNavItem from "../../../components/QuizzesComponent/TabNavItem";
import AttemptedWeeklyQuizzes from "../../../components/QuizzesComponent/AttemptedWeeklyQuizzes";
import AttemptedChapterWiseQuizzes from "../../../components/QuizzesComponent/AttemptedChapterWiseQuiz";
import AttemptedCustomizedQuizzes from "../../../components/QuizzesComponent/AttemptedCustomizedquizzes";
import { useGetWeeklyQuiz } from "../../../services/queries/WekklyQuizqueries";

const attemptedTabs = [
  { id: "weeklyQuiz", label: "Weekly Quiz", mobileOnly: false },
  { id: "chapterQuiz", label: "Chapter Quiz", mobileOnly: false },
  { id: "customizedQuiz", label: "Custom Quiz", mobileOnly: true },
];

const Attempted = () => {
  const [chapterQuizzes] = useState<AttemptedQuizProps[]>([]);
  const [activeTab, setActiveTab] = useState("weeklyQuiz");
  const { data, error, isLoading } = useGetWeeklyQuiz("attempted");

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
      <View className="py-2 border rounded-xl flex-1 border-gray-300">
        <View className="flex-row justify-around pb-2 border-b border-input-border">
          {attemptedTabs.map((tab) => (
            <TabNavItem
              key={tab.id}
              id={tab.id}
              label={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </View>

        <View className="flex-1 min-h-[60vh]">
          {activeTab === "weeklyQuiz" && (
            <AttemptedWeeklyQuizzes quizzes={data?.weeklyQuiz} />
          )}
          {activeTab === "chapterQuiz" && (
            <AttemptedChapterWiseQuizzes quizzes={chapterQuizzes} />
          )}
          {activeTab === "customizedQuiz" && (
            <AttemptedCustomizedQuizzes quizzes={chapterQuizzes} />
          )}
        </View>
      </View>
    </View>
  );
};

export default Attempted;
