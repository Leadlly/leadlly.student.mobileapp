import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/constants";

interface ChapterCardProps {
  number: number;
  title: string;
  questions: number;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  number,
  title,
  questions,
}) => {
  return (
    <Link href={`/errorBook/chapter/${title}/erroredQuestions`} asChild>
      <TouchableOpacity className="border flex-row items-center justify-between bg-white rounded-lg px-4 py-3 mb-3 border-input-border shadow shadow-tab-item-gray">
        <View className="flex-row justify-start items-center gap-4">
          <Text className="text-lg font-mada-medium text-secondary-text">
            {String(number).padStart(2, "0")}
          </Text>
          <View>
            <Text className="text-base font-mada-medium leading-none">
              {title}
            </Text>
            <Text className="text-xs text-gray-500 font-mada-regular">
              {questions} Questions
            </Text>
          </View>
        </View>
        <Feather name="chevron-right" size={20} color={colors.iconGray} />
      </TouchableOpacity>
    </Link>
  );
};

export default ChapterCard;
