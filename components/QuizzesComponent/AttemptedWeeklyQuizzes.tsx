import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { WeeklyQuizProps } from "../../types/types";
import AttemptedWeekQuiz from "./AttemptedWeekQuiz";

type AttemptedWeeklyQuizzesProps = {
  quizzes: WeeklyQuizProps[];
};

const AttemptedWeeklyQuizzes: React.FC<AttemptedWeeklyQuizzesProps> = ({
  quizzes = [
    {
      _id: "1",
      user: "user1",
      questions: {
        Math: [
          {
            _id: "q1",
            question: "What is 2 + 2?",
            options: [
              { name: "3", tag: "A", images: null, _id: "o1" },
              { name: "4", tag: "B", images: null, _id: "o2" },
              { name: "5", tag: "C", images: null, _id: "o3" },
            ],
            standard: 1,
            subject: "Math",
            chapter: ["Basic Arithmetic"],
            topics: ["Addition"],
            subtopics: [],
            level: "Easy",
            images: [],
            createdBy: "admin",
            createdAt: "2023-01-01T00:00:00Z",
          },
        ],
      },
      quizType: "weekly",
      attempted: true,
      reattempted: 0,
      startDate: "2023-01-01T00:00:00Z",
      endDate: "2023-01-07T23:59:59Z",
      createdAt: "2022-12-31T00:00:00Z",
    },
    {
      _id: "2",
      user: "user1",
      questions: {
        Science: [
          {
            _id: "q2",
            question: "What is the chemical symbol for water?",
            options: [
              { name: "H2O", tag: "A", images: null, _id: "o4" },
              { name: "CO2", tag: "B", images: null, _id: "o5" },
              { name: "NaCl", tag: "C", images: null, _id: "o6" },
            ],
            standard: 2,
            subject: "Science",
            chapter: ["Chemistry Basics"],
            topics: ["Chemical Formulas"],
            subtopics: [],
            level: "Medium",
            images: [],
            createdBy: "admin",
            createdAt: "2023-01-08T00:00:00Z",
          },
        ],
      },
      quizType: "weekly",
      attempted: true,
      reattempted: 1,
      startDate: "2023-01-08T00:00:00Z",
      endDate: "2023-01-14T23:59:59Z",
      createdAt: "2023-01-07T00:00:00Z",
    },
  ],
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
