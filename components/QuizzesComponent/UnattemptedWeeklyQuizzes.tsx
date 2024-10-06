import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { WeeklyQuizProps } from "../../types/types";
import UnattemptedWeekQuiz from "./UnattemptedWeekQuiz";

type UnattemptedWeeklyQuizzesProps = {
  quizzes: WeeklyQuizProps[];
};

const UnattemptedWeeklyQuizzes: React.FC<UnattemptedWeeklyQuizzesProps> = ({
  quizzes = [],
}) => {
  return (
    <FlatList
      data={quizzes}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <UnattemptedWeekQuiz quiz={item} />}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={() => (
        <View className="flex-1 justify-center items-center mt-10">
          <Text className="text-sm text-secondary-text font-mada-medium">
            No quiz yet!
          </Text>
        </View>
      )}
      className="flex-1"
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    gap: 10,
  },
});

export default UnattemptedWeeklyQuizzes;
