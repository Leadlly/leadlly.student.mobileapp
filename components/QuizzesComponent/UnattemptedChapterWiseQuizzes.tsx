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
    questions: 10,
  },
  {
    id: 2,
    chapterName: "Newton's Laws of Motion",
    description: "Fundamental principles of classical mechanics",
    subject: "physics",
    questions: 15,
  },
  {
    id: 3,
    chapterName: "Cell Biology",
    description: "Structure and function of cells",
    subject: "biology",
    questions: 12,
  },
  {
    id: 4,
    chapterName: "Periodic Table",
    description: "Elements and their properties",
    subject: "chemistry",
    questions: 20,
  },
];

const UnattemptedChapterWiseQuizzes: React.FC<
  UnattemptedChapterWiseQuizzesProps
> = ({ quizzes = dummyQuizzes }) => {
  return (
    <FlatList
      // data={dummyQuizzes}
      data={quizzes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <UnattemptedChapterQuiz quiz={item} />}
      ListEmptyComponent={() => (
        <View className="flex-1 justify-center items-center my-10">
          <Text className="text-sm text-secondary-text font-mada-medium">
            No chapter quizzes available!
          </Text>
        </View>
      )}
      contentContainerStyle={styles.contentContainer}
      className="flex-1"
      showsVerticalScrollIndicator={false}
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
