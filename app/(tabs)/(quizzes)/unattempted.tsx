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
import { colors, unattemptedQuizTabs } from "../../../constants/constants";

const Unattempted = () => {
  const [chapterQuizzes] = useState<UnattemptedChapterQuizProps[]>([]);
  const [activeTab, setActiveTab] = useState("weeklyQuiz");
  const { data, error, isLoading } = useGetWeeklyQuiz("unattempted");

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="small" color={colors.primary} />
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
      <View className="py-2 border rounded-xl flex-1 border-input-border">
        <View className="flex-row justify-around pb-2 border-b border-input-border">
          {unattemptedQuizTabs.map((tab) => (
            <TabNavItem
              key={tab.id}
              id={tab.id}
              label={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </View>

        <View className=" flex-1 min-h-[60vh] ">
          {activeTab === "weeklyQuiz" && (
            <UnattemptedWeeklyQuizzes quizzes={data?.weeklyQuiz} />
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
