import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Question from "./Question";
import Options from "./Options";
import Progress from "./Pagination";
import SubmitDialog from "./SubmitDialog";
import Toast from "react-native-toast-message";
import {
  TQuizAnswerProps,
  TQuizQuestionOptionsProps,
  TQuizQuestionProps,
} from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../services/redux/hooks";
import { weeklyQuizData } from "../../services/redux/slices/weeklyQuizSlice";
import { getMonthDate } from "../../helpers/utils";
import { useSaveWeeklyQuizQuestion } from "../../services/queries/WekklyQuizqueries";

const Quiz = ({
  quizId,
  questions,
  startDate,
  endDate,
}: {
  quizId: string;
  questions: TQuizQuestionProps[];
  startDate: string;
  endDate: string;
}) => {
  const { quizzes: weekly_quiz_data, loading } = useAppSelector(
    (state) => state.weeklyQuizzes
  );
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(
    weekly_quiz_data.length > 0 ? weekly_quiz_data.length : 0
  );
  const [selectedOption, setSelectedOption] =
    useState<TQuizQuestionOptionsProps | null>(null);
  const [isSaving, setIsSaving] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const saveWeeklyQuizQuestion = useSaveWeeklyQuizQuestion();

  const questionIds = questions.map((ques) => ques._id);

  const storedQuestionIds = weekly_quiz_data.map(
    (data: {
      questionId: string;
      quizId: string;
      topic: { name: string };
      question: TQuizAnswerProps;
    }) => data.questionId
  );

  const attemptedQuestionAnswers = weekly_quiz_data.find(
    (ques: any) => ques.questionId === questions[currentQuestion]?._id
  );

  const quizData = async () => {
    const formattedData = {
      quizId,
      topic: { name: questions[currentQuestion].topics[0] },
      question: {
        question: questions[currentQuestion],
        studentAnswer: selectedOption?.name!,
        isCorrect: selectedOption?.tag === "Correct",
        tag: "weekly_quiz",
      },
    };
    setIsSaving(questions[currentQuestion]._id);
    try {
      const res = await saveWeeklyQuizQuestion.mutateAsync(formattedData);
      dispatch(
        weeklyQuizData({
          questionId: questions[currentQuestion]._id,
          ...formattedData,
        })
      );
      Toast.show({
        type: "success",
        text1: res.message,
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    } finally {
      setIsSaving(null);
    }
  };

  const handleOptionChange = (option: TQuizQuestionOptionsProps) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = async () => {
    if (selectedOption) {
      await quizData();
      setSelectedOption(null);
    }
    setCurrentQuestion((prev: number) =>
      Math.min(prev + 1, questions.length - 1)
    );
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion((prev: number) => Math.max(prev - 1, 0));
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#9654F4" />
      </View>
    );
  }

  return (
    <>
      <View className="flex-1 p-5 pb-20">
        <View className="flex-row justify-between items-center mb-5">
          <TouchableOpacity onPress={() => router.back()} className="flex-1">
            <AntDesign name="arrowleft" size={24} color="gray" />
          </TouchableOpacity>
          <View>
            <Text className="text-lg text-center font-mada-Bold">
              Weekly Quiz
            </Text>
            <Text className="text-sm font-mada-regular text-center text-gray-500">
              {getMonthDate(new Date(startDate))} -{" "}
              {getMonthDate(new Date(endDate))}
            </Text>
          </View>
          <View className="flex-1 items-end">
            <SubmitDialog onSubmit={() => router.replace(`/quiz/${quizId}/report`)} />
          </View>
        </View>
        <Progress
          totalQuestions={questions.length}
          storedQuestionIds={storedQuestionIds}
          currentQuestionId={questions[currentQuestion]?._id}
          loading={isSaving}
        />
        <View>
          <Text className="text-[#7C7C7C] font-mada-semibold text- mb-2">
            Question {currentQuestion + 1} of {questions.length}:
          </Text>
          <ScrollView className="p-4 pb-10 mb-20">
             <Question question={questions[currentQuestion]} />
            <Options
              options={questions[currentQuestion]?.options}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
              attemptedOption={attemptedQuestionAnswers}
            /> 
          </ScrollView>
        </View>
      </View>
      <View className="bg-primary/20 flex-row justify-between items-center p-4">
        <TouchableOpacity
          onPress={handlePrevQuestion}
          className="mr-2 flex items-center flex-row justify-center bg-white border-2 border-gray-400 rounded-lg p-2"
        >
          <AntDesign name="left" size={12} color="gray" />
          <Text className="text-gray-400 font-mada-semibold ml-2">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextQuestion}
          disabled={
            isSaving === questions[currentQuestion]?._id ||
            currentQuestion === questions.length - 1
          }
          className={`ml-2 flex min-w-[100px] items-center flex-row justify-center rounded-lg p-2 border-2 ${
            isSaving === questions[currentQuestion]?._id ||
            currentQuestion === questions.length - 1
              ? "bg-gray-400 border-gray-400"
              : "bg-primary border-primary"
          }`}
        >
          {isSaving === questions[currentQuestion]?._id ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-white text-center font-mada-semibold">
              {selectedOption ? "Save & Next" : "Next"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Quiz;
