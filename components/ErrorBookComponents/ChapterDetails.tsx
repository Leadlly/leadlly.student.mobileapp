import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface ChapterDetailsProps {
  totalQuestions: number;
  chapterName: string;
}

const ChapterDetails: React.FC<ChapterDetailsProps> = ({
  totalQuestions,
  chapterName,
}) => {
  return (
    <View className="flex-col items-center justify-center w-full">
      <View className="flex-col items-center mb-5">
        <Text className="text-primary font-mada-semibold text-xl capitalize text-center">
          {chapterName}
        </Text>
        <View className="flex-row items-center mt-2">
          <FontAwesome name="pencil-square-o" size={24} color="black" />
          <Text className="text-[#6C6C6C] font-mada-medium text-sm ml-2">
            {totalQuestions ?? 0} Questions
          </Text>
        </View>
      </View>
      <Link href={`/errorBook/chapter/${chapterName}/attempt`} asChild>
        <TouchableOpacity className="bg-primary py-2 px-4 rounded-lg">
          <Text className="text-white font-mada-medium text-base">
            Attempt the quiz
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default ChapterDetails;
