import { View, Text } from "react-native";
import React from "react";
import { TStudentOverallReportProps } from "../../types/types";
import { LineChart } from "react-native-gifted-charts";
import { colors } from "../../constants/constants";

const OverallReportChart = ({
  overallProgress,
}: {
  overallProgress: TStudentOverallReportProps[] | null;
}) => {
  const sessionData =
    overallProgress && overallProgress.length
      ? overallProgress.map((data) => ({ value: Math.round(data.session) }))
      : [{ value: 0 }];

  const quizData =
    overallProgress && overallProgress.length
      ? overallProgress.map((data) => ({ value: Math.round(data.quiz) }))
      : [{ value: 0 }];

  return (
    <View>
      <LineChart
        areaChart
        data={sessionData}
        data2={quizData}
        hideDataPoints
        spacing={50}
        initialSpacing={0}
        hideYAxisText
        color1={colors.primary}
        color2={colors.leadllyCyan}
        startFillColor1={colors.primary}
        endFillColor1={colors.primary}
        startFillColor2={colors.leadllyCyan}
        endFillColor2={colors.leadllyCyan}
        startOpacity={0.3}
        endOpacity={0.3}
        thickness={1}
        hideRules
        height={150}
        isAnimated
        animationDuration={1000}
      />
    </View>
  );
};

export default OverallReportChart;
