import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { AttemptedQuizProps } from "../../types/types";
import AttemptedQuiz from "./AttemptedQuiz";

type AttemptedChapterWiseQuizzesProps = {
  quizzes: AttemptedQuizProps[];
};

const dummyQuizzes: AttemptedQuizProps[] = [
  {
    id: 1,
    chapterName: "Introduction to Algebra",
    description: "Basic concepts of algebra and equations",
    subject: "maths",
    questions: 10,
    completedDate: "2023-06-01",
    efficiency: 80,
  },
  {
    id: 2,
    chapterName: "Newton's Laws of Motion",
    description: "Fundamental principles of classical mechanics",
    subject: "physics",
    questions: 15,
    completedDate: "2023-06-02",
    efficiency: 75,
  },
  {
    id: 3,
    chapterName: "Cell Biology",
    description: "Structure and function of cells",
    subject: "biology",
    questions: 12,
    completedDate: "2023-06-03",
    efficiency: 90,
  },
  {
    id: 4,
    chapterName: "Periodic Table",
    description: "Elements and their properties",
    subject: "chemistry",
    questions: 20,
    completedDate: "2023-06-04",
    efficiency: 85,
  },
];

const AttemptedChapterWiseQuizzes: React.FC<
  AttemptedChapterWiseQuizzesProps
> = ({ quizzes = dummyQuizzes }) => {
  return (
    <FlatList
      data={quizzes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <AttemptedQuiz quiz={item} />}
      ListEmptyComponent={() => (
        <View className="flex-1 justify-center items-center my-10">
          <Text className="text-sm text-secondary-text font-mada-medium">
            No attempted chapter quizzes available!
          </Text>
        </View>
      )}
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

export default AttemptedChapterWiseQuizzes;
