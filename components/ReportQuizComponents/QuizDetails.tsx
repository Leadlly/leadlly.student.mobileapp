import React from 'react';
import { View, Text } from 'react-native';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';

const QuizDetails = () => {
  return (
    <View>
      <View className="flex-col justify-around w-full p-3 space-y-5 ">
        <View className="flex-col justify-start items-start space-y-2">
          <View className="flex-row justify-center items-center gap-3">
            <Text className="text-[#9654F4] font-mada-Bold text-2xl">
              Weekly Quiz
            </Text>
            <Text className="text-lg font-mada-medium">(Jan 05 - Jan 11)</Text>
          </View>
          <View className="flex-row w-full justify-around space-x-3">
            <View className="flex-row items-center gap-2">
              <Ionicons name="calendar-outline" size={16} color="#6C6C6C" />
              <Text className="text-[#6C6C6C] text-sm font-mada-semibold">
                18 Jan, 2024
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Ionicons name="time-outline" size={16} color="#6C6C6C" />
              <Text className="text-[#6C6C6C] text-sm font-mada-semibold">
                30 min
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <FontAwesome name="pencil-square-o" size={16} color="#6C6C6C" />
              <Text className="text-[#6C6C6C] text-sm font-mada-semibold">
                30 Questions
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center justify-between space-x-6">
          <View className="flex-row bg-white rounded-[10px] space-x-2   items-center justify-center flex-1 py-1">
            <View className="bg-[#FF990036] w-8 h-8 justify-center  items-center rounded-full">
              <Ionicons name="trophy-outline" size={20} color="#FF9900" />
            </View>
            <View>
              <Text className="text-[#AEAEAE] font-mada-semibold text-sm">
                Points
              </Text>
              <Text className="text-[#AEAEAE]  font-mada-Bold">
                <Text className="text-black ">10</Text>/20
              </Text>
            </View>
          </View>
          <View className="flex-row bg-white rounded-[10px]  items-center flex-1 justify-center py-1 space-x-2">
            <View className="bg-[#0FD67936] w-8 h-8 justify-center  items-center rounded-full ">
              <Feather name="target" size={20} color="#0FD679" />
            </View>
            <View>
              <Text className="text-[#AEAEAE] font-mada-semibold text-sm">
                Efficiency
              </Text>
              <Text>
                <Text className="text-black font-bold">36%</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default QuizDetails;
