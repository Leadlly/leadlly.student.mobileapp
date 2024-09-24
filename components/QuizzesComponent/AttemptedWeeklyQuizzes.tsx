import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { WeeklyQuizProps } from "../../types/types";
import AttemptedWeekQuiz from "./AttemptedWeekQuiz";

type AttemptedWeeklyQuizzesProps = {
  quizzes: WeeklyQuizProps[];
};

const AttemptedWeeklyQuizzes: React.FC<AttemptedWeeklyQuizzesProps> = ({
  quizzes
}) => {
  if (!quizzes || quizzes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">No attempted quizzes yet!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={quizzes}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <AttemptedWeekQuiz quiz={item} />}
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

export default AttemptedWeeklyQuizzes;
