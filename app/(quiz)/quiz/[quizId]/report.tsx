import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import TopicsCovered from "../../../../components/ReportQuizComponents/TopicCovered";
import Score from "../../../../components/ReportQuizComponents/Score";
import AttemptAnalysis from "../../../../components/ReportQuizComponents/AttemptAnalysis";
import TopicsEfficiency from "../../../../components/ReportQuizComponents/TopicEfficiency";
import SolutionAnalysis from "../../../../components/ReportQuizComponents/SolutionAnalysis";
import QuizDetails from "../../../../components/ReportQuizComponents/QuizDetails";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useGetQuizReport } from "../../../../services/queries/reportQueries";

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
    <SafeAreaView className="bg-white/50">
      <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps="always">
        <View>
          <View className="flex justify-center w-full p-4 mt-5 ">
            <Text className="text-2xl md:text-4xl font-semibold text-center">
              Quiz Report
            </Text>
          </View>
          <View className="flex flex-col items-start justify-between p-5 pb-6  bg-[#9654F42E] gap-16 rounded-lg m-5">
            <QuizDetails />
          </View>
        </View>
        <TopicsCovered />
        <View className="flex">
          <TopicsCovered />
          <TopicsEfficiency report={report} />
        </View>
        <View className="flex flex-1 gap-5 max-md:mx-5">
          <AttemptAnalysis
            correctAnswers={report?.correctAnswers}
            incorrectAnswers={report?.inCorrectAnswers}
            totalQuestions={report?.totalQuestions}
          />
          <Score score={report?.score} questions={report?.totalQuestions} />
        </View>
        {report && <SolutionAnalysis questions={report.questions} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Report;
