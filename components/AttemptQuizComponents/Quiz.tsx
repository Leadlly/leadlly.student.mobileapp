import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
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
import { useGenerateQuizReport } from "../../services/queries/reportQueries";
import { colors } from "../../constants/constants";
import clsx from "clsx";

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
        question: questions[currentQuestion]._id,
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
    setSelectedOption(null);
    setCurrentQuestion((prev: number) => Math.max(prev - 1, 0));
  };

  const { mutateAsync: generateQuizReport, isPending: generatingReport } =
    useGenerateQuizReport(quizId);

  const onQuizSubmit = async () => {
    try {
      const res = await generateQuizReport();
      Toast.show({
        type: "success",
        text1: res.message,
      });
      router.replace(`/quiz/${quizId}/report`);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
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
      <View className="flex-1 bg-white p-5 pb-20">
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
            <SubmitDialog
              onSubmit={onQuizSubmit}
              isGeneratingReport={generatingReport}
            />
          </View>
        </View>
        <Progress
          totalQuestions={questions.length}
          storedQuestionIds={storedQuestionIds}
          currentQuestionId={questions[currentQuestion]?._id}
          loading={isSaving}
        />
        <View>
          <Text className="text-tab-item-gray font-mada-semibold text-sm mb-2">
            Question {currentQuestion + 1} of {questions.length}:
          </Text>
          {questions[currentQuestion] ? (
            <ScrollView className="pb-10 mb-20">
              <Question question={questions[currentQuestion]} />
              <Options
                options={questions[currentQuestion]?.options}
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
                attemptedOption={attemptedQuestionAnswers}
              />
            </ScrollView>
          ) : (
            <View className="min-h-[200px] items-center justify-center">
              <Text className="text-base font-mada-medium text-secondary-text text-center">
                No Question Available!!
              </Text>
              <Text className="text-base font-mada-medium text-secondary-text text-center">
                Please try the next question.
              </Text>
            </View>
          )}
        </View>
      </View>
      <View className="bg-primary/20 flex-row justify-between items-center p-4">
        <TouchableOpacity
          onPress={handlePrevQuestion}
          disabled={
            currentQuestion === 0 ||
            isSaving === questions[currentQuestion]?._id
          }
          className={clsx(
            "mr-2 items-center flex-row justify-center bg-white border-2 border-input-border rounded-lg p-2",
            currentQuestion === 0 && "opacity-70"
          )}
        >
          <AntDesign name="left" size={12} color={colors.iconGray} />
          <Text className="text-tab-item-gray font-mada-semibold ml-2">
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextQuestion}
          disabled={
            isSaving === questions[currentQuestion]?._id ||
            (!selectedOption && currentQuestion === questions.length - 1)
          }
          className={`ml-2 flex min-w-[100px] items-center flex-row justify-center rounded-lg p-2 border-2 bg-primary border-primary ${
            isSaving === questions[currentQuestion]?._id ||
            (!selectedOption && currentQuestion === questions.length - 1)
              ? "opacity-70"
              : ""
          }`}
        >
          {isSaving === questions[currentQuestion]?._id ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : !(currentQuestion === questions.length - 1) ? (
            <Text className="text-white text-center font-mada-semibold">
              {selectedOption ? "Save & Next" : "Next"}
            </Text>
          ) : (
            <Text className="text-white text-center font-mada-semibold">
              Save
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Quiz;
