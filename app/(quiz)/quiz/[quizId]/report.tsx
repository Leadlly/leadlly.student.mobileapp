import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import TopicsCovered from "../../../../components/ReportQuizComponents/TopicCovered";
import Score from "../../../../components/ReportQuizComponents/Score";
import AttemptAnalysis from "../../../../components/ReportQuizComponents/AttemptAnalysis";
import SolutionAnalysis from "../../../../components/ReportQuizComponents/SolutionAnalysis";
import QuizDetails from "../../../../components/ReportQuizComponents/QuizDetails";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useGetQuizReport } from "../../../../services/queries/reportQueries";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { colors } from "../../../../constants/constants";

type Props = {};

const Report = (props: Props) => {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const { data: report, isLoading, error } = useGetQuizReport(quizId);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (error || !report) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">No report found for this quiz.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <BottomSheetModalProvider>
        <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <View className="p-5">
            <View className="mb-5">
              <Text className="text-2xl md:text-4xl font-mada-semibold text-center">
                Quiz Report
              </Text>
            </View>
            <View className="bg-primary/20 rounded-lg p-5 mb-5">
              <QuizDetails
                date={new Date(report.updatedAt || report.createdAt)}
                timeTaken={Math.floor(report.timeTaken / 60).toString()}
                totalQuestions={report.maxScore / 4}
                attemptedQuestions={report.questions.length}
                efficiency={report.overallEfficiency}
                correctAnswers={report.correctCount}
              />
            </View>
            <TopicsCovered subjectWiseReport={report.subjectWiseReport} />
            <AttemptAnalysis
              correctAnswers={report.correctCount}
              incorrectAnswers={report.incorrectCount}
              attemptedQuestions={report.questions.length}
              efficiency={report.overallEfficiency}
              maxScore={report.maxScore}
            />
            <Score
              maxScore={report.maxScore}
              marksScored={report?.totalMarks || report.correctCount * 4 - report.incorrectCount}
            />
            <SolutionAnalysis questions={report.questions} />
          </View>
        </ScrollView>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default Report;
