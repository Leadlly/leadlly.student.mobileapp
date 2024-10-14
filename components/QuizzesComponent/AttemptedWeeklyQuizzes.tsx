import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
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
        <View className="justify-center items-center mt-16">
          <Image
            source={require("../../assets/images/typing_laptop.png")}
            resizeMode="contain"
            className="w-40 h-40"
          />
          <Text className="text-2xl font-mada-semibold mt-9 text-center">
            No Attempted Quizzes, yet!
          </Text>
          <Text className="text-base font-mada-regular text-secondary-text text-center max-w-[320px] mt-2">
            No Quizzes in your inbox, yet! Start your journey to create and
            attempt quizzes
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
