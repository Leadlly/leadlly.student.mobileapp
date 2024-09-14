import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { AttemptedQuizProps } from "../../types/types";
import AttemptedQuiz from "./AttemptedQuiz";

type AttemptedCustomizedQuizzesProps = {
  quizzes: AttemptedQuizProps[];
};

const dummyQuizzes: AttemptedQuizProps[] = [
  {
    id: 1,
    chapterName: "Custom Quiz 1",
    description: "Mixed topics from various subjects",
    subject: "mixed",
    questions: 20,
    completedDate: "2023-06-05",
    efficiency: 85,
  },
  {
    id: 2,
    chapterName: "Custom Quiz 2",
    description: "Focus on problem-solving skills",
    subject: "mixed",
    questions: 15,
    completedDate: "2023-06-06",
    efficiency: 78,
  },
  {
    id: 3,
    chapterName: "Custom Quiz 3",
    description: "Review of recent topics",
    subject: "mixed",
    questions: 25,
    completedDate: "2023-06-07",
    efficiency: 92,
  },
  {
    id: 4,
    chapterName: "Custom Quiz 4",
    description: "Preparation for upcoming exam",
    subject: "mixed",
    questions: 30,
    completedDate: "2023-06-08",
    efficiency: 88,
  },
];

const AttemptedCustomizedQuizzes: React.FC<AttemptedCustomizedQuizzesProps> = ({
  quizzes = dummyQuizzes,
}) => {
  if (!quizzes || quizzes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">
          No attempted customized quizzes available!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={quizzes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <AttemptedQuiz quiz={item} />}
      contentContainerStyle={styles.contentContainer}
      className="flex-1 w-full"
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    gap: 16,
  },
});

export default AttemptedCustomizedQuizzes;
