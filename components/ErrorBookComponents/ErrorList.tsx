import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ErrorBookProps } from "../../types/types";
import { Image } from "expo-image";

type CustomTabsProps = {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
};

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="flex-grow-0 px-4"
  >
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab}
        onPress={() => onTabPress(tab)}
        className={`rounded-lg font-semibold border-2 px-3 py-2 mr-4 ${
          activeTab === tab
            ? "border-[#9654F4] bg-[#9654F412] text-[#9654F4]"
            : "border-[#A2A2A2] text-[#A2A2A2]"
        }`}
      >
        <Text
          className={`font-semibold capitalize ${
            activeTab === tab ? "text-[#9654F4]" : "text-[#A2A2A2]"
          }`}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const CustomSeparator: React.FC = () => (
  <View className="h-[1px] bg-[#A7A7A7B0] my-5" />
);

type ChapterCardProps = {
  number: number;
  title: string;
  questions: number;
};

const ChapterCard: React.FC<ChapterCardProps> = ({
  number,
  title,
  questions,
}) => (
  <View className="flex-row p-4 border-b border-[#E5E7EB]">
    <Text className="text-base font-semibold mr-2">{number}.</Text>
    <View className="flex-1">
      <Text className="text-base font-medium">{title}</Text>
      <Text className="text-sm text-[#6B7280] mt-1">{questions} questions</Text>
    </View>
  </View>
);

export default function ErrorList({ errorBook }: ErrorBookProps) {
  if (!errorBook || errorBook.length < 1) {
    return (
      <View className="w-full items-center justify-center  flex h-[70vh]">
        <Image
          source={require("../../assets/images/no-question.png")}
          className="w-[30vh] h-[30vh]"
        />
        <Text className="text-xl font-bold text-[#4B5563] mt-6">
          No wrong questions yet
        </Text>
        <Text className="text-[#9CA3AF] text-sm text-center px-8 mt-2 leading-5">
          Your error book is empty. Keep practicing and add questions you get
          wrong.
        </Text>
      </View>
    );
  }

  const [activeTab, setActiveTab] = useState(errorBook[0]?.subject);

  return (
    <View className="flex-1 w-full">
      <CustomTabs
        tabs={errorBook.map((tab) => tab.subject)}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
      <CustomSeparator />
      <ScrollView>
        {errorBook.map(
          (tab) =>
            activeTab === tab.subject && (
              <View key={tab.subject}>
                {tab.chapters.map((chapter, index: number) => (
                  <ChapterCard
                    key={chapter.chapter}
                    number={index + 1}
                    title={chapter.chapter}
                    questions={chapter.totalQuestions}
                  />
                ))}
              </View>
            )
        )}
      </ScrollView>
    </View>
  );
}
