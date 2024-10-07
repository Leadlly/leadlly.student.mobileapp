import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ErrorBookProps } from "../../types/types";
import { Image } from "expo-image";
import ChapterCard from "./ChapterCard";

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
  <View className="flex-row items-center justify-between px-5 bg-white">
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab}
        onPress={() => onTabPress(tab)}
        className={`rounded-lg border px-5 py-1.5 ${
          activeTab === tab
            ? "border-primary bg-primary/10 text-primary"
            : "border-tab-item-gray text-tab-item-gray"
        }`}
      >
        <Text
          className={`font-mada-semibold capitalize ${
            activeTab === tab ? "text-primary" : "text-tab-item-gray"
          }`}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    ))}
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
    <View className="flex-1 mb-16">
      <CustomTabs
        tabs={errorBook.map((tab) => tab.subject)}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
      <ScrollView className="p-5">
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
