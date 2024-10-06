import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { WeeklyQuizProps } from "../../types/types";
import AttemptedWeekQuiz from "./AttemptedWeekQuiz";

type AttemptedWeeklyQuizzesProps = {
  quizzes: WeeklyQuizProps[];
};

const AttemptedWeeklyQuizzes: React.FC<AttemptedWeeklyQuizzesProps> = ({
  quizzes,
}) => {
  return (
    <FlatList
      data={quizzes}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <AttemptedWeekQuiz quiz={item} />}
      ListEmptyComponent={() => (
        <View className="flex-1 justify-center items-center my-10">
          <Text className="text-sm text-secondary-text font-mada-medium">
            No attempted quizzes yet!
          </Text>
        </View>
      )}
      contentContainerStyle={styles.contentContainer}
      className="flex-1"
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
