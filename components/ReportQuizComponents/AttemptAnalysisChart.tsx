import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

interface AttemptAnalysisChartProps {
  correctAnswers: number;
  incorrectAnswers: number;
  notAttempted: number;
  efficiency: number;
}

const AttemptAnalysisChart: FC<AttemptAnalysisChartProps> = ({
  correctAnswers,
  incorrectAnswers,
  notAttempted,
  efficiency,
}) => {
  const data = [
    { value: correctAnswers, color: '#0FD679', text: `${correctAnswers}` },
    { value: incorrectAnswers, color: '#E62308', text: `${incorrectAnswers}` },
    { value: notAttempted, color: '#9654F41A', text: `${notAttempted}` },
  ];

  return (
    <View className="items-center">
      <PieChart
        data={data}
        donut
        radius={75}
        innerRadius={60}
        centerLabelComponent={() => {
          return (
            <View className="items-center justify-center">
              <Text className="text-2xl font-bold">{efficiency}%</Text>
              <Text className="text-xs text-gray-500">Efficiency</Text>
            </View>
          );
        }}
      />
      
    </View>
  );
};

export default AttemptAnalysisChart;
