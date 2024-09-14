import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  AttemptedQuizProps,
  WeeklyQuizProps,
} from "../../../types/types";
import TabNavItem from "../../../components/QuizzesComponent/TabNavItem";
import AttemptedWeeklyQuizzes from "../../../components/QuizzesComponent/AttemptedWeeklyQuizzes";
import AttemptedChapterWiseQuizzes from "../../../components/QuizzesComponent/AttemptedChapterWiseQuiz";
import AttemptedCustomizedQuizzes from "../../../components/QuizzesComponent/AttemptedCustomizedquizzes";

const attemptedTabs = [
  { id: "weeklyQuiz", label: "Weekly Quiz", mobileOnly: false },
  { id: "chapterQuiz", label: "Chapter Quiz", mobileOnly: false },
  { id: "customizedQuiz", label: "Custom Quiz", mobileOnly: true },
];

const Attempted = ({
  weeklyQuizzes,
}: {
  weeklyQuizzes: WeeklyQuizProps[];
}) => {
  const [chapterQuizzes] = useState<AttemptedQuizProps[]>([]);
  const [activeTab, setActiveTab] = useState("weeklyQuiz");

  return (
    <View className="flex-1 bg-white p-4 pb-20">
      <View className="py-2 border rounded-xl flex-1 border-gray-300">
        <View className="flex-row justify-around px-4">
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

        <View className="h-px bg-gray-300 my-3" />

        <View className="flex-1 min-h-[60vh]">
          {activeTab === "weeklyQuiz" && (
            <AttemptedWeeklyQuizzes quizzes={weeklyQuizzes} />
          )}
          {activeTab === "chapterQuiz" && (
            <AttemptedChapterWiseQuizzes quizzes={chapterQuizzes} />
          )}
          {activeTab === "customizedQuiz" && (
            <View className="items-center lg:hidden">
              <AttemptedCustomizedQuizzes quizzes={chapterQuizzes} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Attempted;