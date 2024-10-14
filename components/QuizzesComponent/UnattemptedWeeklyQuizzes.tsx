import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
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
        <View className="justify-center items-center mt-16">
          <Image
            source={require("../../assets/images/typing_laptop.png")}
            resizeMode="contain"
            className="w-40 h-40"
          />
          <Text className="text-2xl font-mada-semibold mt-9 text-center">
            No Quizzes, yet!
          </Text>
          <Text className="text-base font-mada-regular text-secondary-text text-center max-w-[320px] mt-2">
            No Quizzes in your inbox, yet! Start your journey to create quizzes
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
