import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Progress from "react-native-progress";
import { colors } from '../../constants/constants';

interface ProgressProps {
  totalQuestions: number;
  storedQuestionIds: string[];
  loading?: string | null;
  currentQuestionId: string;
}

const ProgressComponent: React.FC<ProgressProps> = ({
  totalQuestions,
  storedQuestionIds,
  loading,
  currentQuestionId,
}) => {
  const attemptedQuestions = storedQuestionIds.length;
  const progress = attemptedQuestions / totalQuestions;
  const isLoading = loading === currentQuestionId;

  return (
    <View className="py-2">
      <View className="mb-2 flex flex-row items-center gap-3">
        <View className="w-[70%] flex-1">
          <Progress.Bar 
            progress={progress} 
            width={null} 
            height={6} 
            color={colors.primary} 
            unfilledColor="#E0E0E0" 
            borderWidth={0}
          />
        </View>
    
        {isLoading ? (
          <View className='size-5 flex items-center justify-center'>
            <ActivityIndicator size={20} color="#6200EE" />
          </View>
        ) : (
          <View className='size-5 flex items-center justify-center'>
            <Text className="text-sm font-mada-Bold">
              {attemptedQuestions} / {totalQuestions}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProgressComponent;
