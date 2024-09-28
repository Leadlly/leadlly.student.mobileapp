import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ScoreProps = {
  score: number;
  questions: number;
};

const Score: React.FC<ScoreProps> = ({ score, questions }) => {
  const totalMarks = questions * 4;

  return (
    <View className="shadow-section my-6 p-6 rounded-[12px] flex-1 bg-white">
      <Text className="text-lg md:text-3xl font-semibold mb-5 text-[#9E9E9E]">
        Score
      </Text>
      <View className="flex-col md:flex-row items-center justify-between">
        <View>
          <View className="flex-row justify-center items-baseline">
            <Text className="text-7xl font-bold text-purple-500">{score}</Text>
            <Text className="font-medium text-lg text-[#666666]">
              marks
            </Text>
          </View>
          <Text className="font-medium text-lg text-[#939393]">
            Scored out of {totalMarks} marks ({questions}Q)
          </Text>
          <View className="flex-row font-medium justify-start items-center gap-4 mt-3">
            <View className="w-3 h-3 rounded-full bg-[#0FD679]" />
            <Text className="text-lg">
              For correct answer +4 marks
            </Text>
          </View>
          <View className="flex-row font-medium justify-start items-center gap-4">
            <View className="w-3 h-3 rounded-full bg-[#E62308]" />
            <Text className="text-lg">
              For incorrect answer -1 marks
            </Text>
          </View>
        </View>
        <View className="bg-[#9654F42E] rounded-[8px] flex-row overflow-hidden justify-start items-center p-3 pb-0 mt-5">
          <View>
            <Text className="text-lg font-semibold">
              Improvement
            </Text>
            <Text className="text-[#797979] text-lg font-medium">
              Previous: <Text className="text-blue-700">30 marks</Text>
            </Text>
            <View className="flex-row items-center">
              <Text className="text-[#797979] text-lg font-medium">
                Improved:{' '}
                <Text className="text-orange-300">
                  +21%{' '}
                </Text>
              </Text>
              <Ionicons name="arrow-up" size={20} color="#FFA500" />
            </View>
          </View>

          <View className="items-end">
            <Image
              source={require('../../assets/images/improve.png')}
              style={{ width: 150, height: 120 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Score;
