import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TopicsCovered = () => {
  const topics = [
    {
      id: "1",
      subject: "Maths",
      details: "Vector Algebra, Matrices and Determinants",
    },
    {
      id: "2",
      subject: "Physics",
      details: "Electromagnetic Induction, Laws of Motion",
    },
    {
      id: "3",
      subject: "Chemistry",
      details: "Chemical Bonding, Atomic Structures",
    },
    {
      id: "4",
      subject: "Maths",
      details: "Vector Algebra, Matrices and Determinants",
    },
    {
      id: "5",
      subject: "Physics",
      details: "Electromagnetic Induction, Laws of Motion",
    },
    {
      id: "6",
      subject: "Chemistry",
      details: "Chemical Bonding, Atomic Structures",
    },
  ];

  return (
    <View className="m-5 p-5 rounded-lg bg-white shadow-md ">
      <Text className="text-xl font-mada-semibold mb-4 text-[#AEAEAE]  ">
        Topics Covered
      </Text>
      <ScrollView
        className="max-h-52"
        keyboardShouldPersistTaps="always"
        scrollEnabled={true}
        nestedScrollEnabled={true}
      >
        {topics.map((item) => (
          <View
            key={item.id}
            className="border border-opacity-20 border-black/10 rounded-lg p-2 flex-row justify-between items-center mb-3"
          >
            <View>
              <Text className="font-medium text-sm">{item.subject}</Text>
              <Text className="text-gray-600 text-xs">{item.details}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopicsCovered;
