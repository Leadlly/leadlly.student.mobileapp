import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { WeeklyQuizProps } from "../../types/types";
import UnattemptedWeekQuiz from "./UnattemptedWeekQuiz";

type UnattemptedWeeklyQuizzesProps = {
  quizzes: WeeklyQuizProps[];
};

const UnattemptedWeeklyQuizzes: React.FC<UnattemptedWeeklyQuizzesProps> = ({
  quizzes = [
    {
      _id: "1",
      user: "user1",
      questions: {
        math: [
          {
            _id: "q1",
            question: "What is 2+2?",
            options: [
              { name: "3", tag: "A", images: null, _id: "o1" },
              { name: "4", tag: "B", images: null, _id: "o2" },
              { name: "5", tag: "C", images: null, _id: "o3" },
            ],
            standard: 1,
            subject: "math",
            chapter: ["basic arithmetic"],
            topics: ["addition"],
            subtopics: ["simple addition"],
            level: "easy",
            images: [],
            createdBy: "admin",
            createdAt: "2023-06-01T00:00:00Z",
          },
        ],
      },
      quizType: "weekly",
      attempted: false,
      reattempted: 0,
      startDate: "2023-06-01T00:00:00Z",
      endDate: "2023-06-07T23:59:59Z",
      createdAt: "2023-05-31T12:00:00Z",
    },
    {
      _id: "2",
      user: "user1",
      questions: {
        science: [
          {
            _id: "q2",
            question: "What is the chemical symbol for water?",
            options: [
              { name: "H2O", tag: "A", images: null, _id: "o4" },
              { name: "CO2", tag: "B", images: null, _id: "o5" },
              { name: "NaCl", tag: "C", images: null, _id: "o6" },
            ],
            standard: 2,
            subject: "science",
            chapter: ["chemistry basics"],
            topics: ["chemical formulas"],
            subtopics: ["water molecule"],
            level: "medium",
            images: [],
            createdBy: "admin",
            createdAt: "2023-06-02T00:00:00Z",
          },
        ],
      },
      quizType: "daily",
      attempted: false,
      reattempted: 0,
      startDate: "2023-06-02T00:00:00Z",
      endDate: "2024-09-14T23:59:59Z",
      createdAt: "2023-06-01T12:00:00Z",
    },
    {
      _id: "3",
      user: "user1",
      questions: {
        english: [
          {
            _id: "q3",
            question: "What is the past tense of 'go'?",
            options: [
              { name: "gone", tag: "A", images: null, _id: "o7" },
              { name: "went", tag: "B", images: null, _id: "o8" },
              { name: "going", tag: "C", images: null, _id: "o9" },
            ],
            standard: 3,
            subject: "english",
            chapter: ["grammar"],
            topics: ["verb tenses"],
            subtopics: ["irregular verbs"],
            level: "easy",
            images: [],
            createdBy: "admin",
            createdAt: "2023-06-03T00:00:00Z",
          },
        ],
      },
      quizType: "monthly",
      attempted: false,
      reattempted: 0,
      startDate: "2023-06-01T00:00:00Z",
      endDate: "2024-10-30T23:59:59Z",
      createdAt: "2023-05-31T12:00:00Z",
    },
  ],
}) => {
  if (!quizzes || quizzes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">No quiz yet!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={quizzes}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <UnattemptedWeekQuiz quiz={item} />}
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

export default UnattemptedWeeklyQuizzes;
