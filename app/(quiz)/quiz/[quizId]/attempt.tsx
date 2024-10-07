import React from "react";
import { ActivityIndicator, View } from "react-native";
import QuizDataCleaner from "../../../../components/AttemptQuizComponents/QuizDataCleaner";
import Quiz from "../../../../components/AttemptQuizComponents/Quiz";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useGetWeeklyQuizQuestions } from "../../../../services/queries/WekklyQuizqueries";
import { colors } from "../../../../constants/constants";

const AttemptQuiz: React.FC = () => {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const { data: quizData, isLoading } = useGetWeeklyQuizQuestions(quizId);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (!quizData) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <QuizDataCleaner endDate={quizData.endDate} />
        <Quiz
          quizId={quizId}
          questions={quizData.weeklyQuestions}
          startDate={quizData.startDate}
          endDate={quizData.endDate}
        />
      </View>
    </SafeAreaView>
  );
};

export default AttemptQuiz;
