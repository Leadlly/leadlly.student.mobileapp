import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
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
        <View className="justify-center items-center mt-16">
          <Image
            source={require("../../assets/images/typing_laptop.png")}
            resizeMode="contain"
            className="w-40 h-40"
          />
          <Text className="text-2xl font-mada-semibold mt-9 text-center">
            No Chapter Quizzes, yet!
          </Text>
          <Text className="text-base font-mada-regular text-secondary-text text-center max-w-[320px] mt-2">
            No Quizzes in your inbox, yet! Start your journey to create quizzes
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
