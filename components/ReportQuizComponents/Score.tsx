import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ScoreProps = {
  totalMarks: number;
  marksScored: number;
  previousScore?: number;
};

const Score: React.FC<ScoreProps> = ({ totalMarks, marksScored, previousScore }) => {
  const questions = Math.round(totalMarks / 4);
  
  const improvement = previousScore !== undefined
    ? ((marksScored - previousScore) / previousScore) * 100
    : 0;
  const improvementPercentage = improvement.toFixed(1);
  const improvementText = previousScore !== undefined
    ? `+${improvementPercentage}%`
    : '-';

  return (
    <View className="shadow-lg shadow-gray-400 my-6 p-6 rounded-[12px] flex-1 bg-white">
      <Text className="text-lg md:text-3xl font-mada-semibold mb-5 text-[#9E9E9E]">
        Score
      </Text>
      <View className="flex-col md:flex-row items-center justify-between">
        <View>
          <View className="flex-row justify-center items-baseline">
            <Text className="text-7xl font-mada-bold text-purple-500">{marksScored}</Text>
            <Text className="font-mada-medium text-lg text-[#666666]">marks</Text>
          </View>
          <Text className="font-mada-medium text-lg text-[#939393]">
            Scored out of {totalMarks} marks ({questions}Q)
          </Text>
          <View className="flex-row font-mada-medium justify-start items-center gap-4 mt-3">
            <View className="w-3 h-3 rounded-full bg-[#0FD679]" />
            <Text className="text-lg">For correct answer +4 marks</Text>
          </View>
          <View className="flex-row font-mada-medium justify-start items-center gap-4">
            <View className="w-3 h-3 rounded-full bg-[#E62308]" />
            <Text className="text-lg">For incorrect answer -1 marks</Text>
          </View>
        </View>
        <View className="bg-[#9654F42E] rounded-[8px] flex-row overflow-hidden justify-between items-center p-5 w-full pb-0 mt-5">
          <View>
            <Text className="text-base font-mada-semibold">Improvement</Text>
            <Text className="text-[#797979] text-sm font-mada-medium">
              Previous: <Text className="text-blue-700">{previousScore !== undefined ? `${previousScore} marks` : '-'}</Text>
            </Text>
            <View className="flex-row items-center">
              <Text className="text-[#797979] text-sm font-mada-medium">
                Improved: <Text className="text-orange-300">{improvementText} </Text>
              </Text>
              {previousScore !== undefined && <Ionicons name="arrow-up" size={16} color="#FFA500" />}
            </View>
          </View>
          <View className="items-end">
            <Image
              source={require("../../assets/images/improve.png")}
              style={{ width: 130, height: 100 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Score;
