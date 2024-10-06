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
import { QuizReport, SolvedQuestion } from "../../../../types/types";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

type Props = {};

const Report = (props: Props) => {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
   const { data: report, isLoading, error } = useGetQuizReport(quizId);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#9654F4" />
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
    <BottomSheetModalProvider>
      <SafeAreaView className="bg-white/50 min-h-screen">
        <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="always"
        >
          <View className="p-5">
            <View className="mb-5">
              <Text className="text-2xl md:text-4xl font-semibold text-center">
                Quiz Report
              </Text>
            </View>
            <View className="bg-[#9654F42E] rounded-lg p-5 mb-5">
              <QuizDetails
                date={new Date(report.updatedAt || report.createdAt)}
                timeTaken={Math.floor(report.timeTaken / 60).toString()}
                totalQuestions={report.questions.length}
                efficiency={report.overallEfficiency}
                correctAnswers={report.correctCount}
              />
            </View>
            <TopicsCovered subjectWiseReport={report.subjectWiseReport} />
            <AttemptAnalysis
              correctAnswers={report.correctCount}
              incorrectAnswers={report.incorrectCount}
              totalQuestions={report.questions.length}
              efficiency={report.overallEfficiency}
            />
            <Score
              totalMarks={report.totalMarks}
              marksScored={report.correctCount * 4 - report.incorrectCount}
            />
            <SolutionAnalysis questions={report.questions} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default Report;
