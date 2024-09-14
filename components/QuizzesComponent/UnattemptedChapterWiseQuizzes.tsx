import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { UnattemptedChapterQuizProps } from "../../types/types";
import UnattemptedChapterQuiz from "./UnattemptedChapterQuiz";

type UnattemptedChapterWiseQuizzesProps = {
  quizzes: UnattemptedChapterQuizProps[];
};

const dummyQuizzes: UnattemptedChapterQuizProps[] = [
  {
    id: 1,
    chapterName: "Introduction to Algebra",
    description: "Basic concepts of algebra and equations",
    subject: "maths",
    questions: 10
  },
  {
    id: 2,
    chapterName: "Newton's Laws of Motion",
    description: "Fundamental principles of classical mechanics",
    subject: "physics",
    questions: 15
  },
  {
    id: 3,
    chapterName: "Cell Biology",
    description: "Structure and function of cells",
    subject: "biology",
    questions: 12
  },
  {
    id: 4,
    chapterName: "Periodic Table",
    description: "Elements and their properties",
    subject: "chemistry",
    questions: 20
  }
];

const UnattemptedChapterWiseQuizzes: React.FC<
  UnattemptedChapterWiseQuizzesProps
> = ({ quizzes = dummyQuizzes }) => {
  
  if (!quizzes || quizzes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">
          No chapter quizzes available!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      // data={dummyQuizzes}
      data={quizzes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <UnattemptedChapterQuiz quiz={item} />}
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

export default UnattemptedChapterWiseQuizzes;
