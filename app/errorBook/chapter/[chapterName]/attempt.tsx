import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ErrorBookQuestion, TQuizQuestionOptionsProps } from '../../../../types/types';
import { useGetChapterErrorBook, useUpdateErrorNote } from '../../../../services/queries/errorBookQuery';
import SubmitDialog from '../../../../components/AttemptQuizComponents/SubmitDialog';
import Question from '../../../../components/AttemptQuizComponents/Question';
import Options from '../../../../components/AttemptQuizComponents/Options';
import Progress from '../../../../components/AttemptQuizComponents/Pagination';
import Toast from 'react-native-toast-message';

interface AnsweredQuestion {
  questionId: string;
  isCorrect: boolean | null;
  selectedOption: TQuizQuestionOptionsProps | null;
}

const Attempt = () => {
  const { chapterName } = useLocalSearchParams<{ chapterName: string }>();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const { data, isLoading, isError } = useGetChapterErrorBook(chapterName);
  const updateErrorNoteMutation = useUpdateErrorNote();

  const chapterErrorBook: ErrorBookQuestion[] = data?.chapterErrorBook || [];
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>(
    chapterErrorBook.map((question) => ({
      questionId: question._id,
      selectedOption: null,
      isCorrect: null,
    }))
  );

  const handleOptionChange = (option: TQuizQuestionOptionsProps) => {
    setAnsweredQuestions((prev) =>
      prev.map((question) =>
        question.questionId === chapterErrorBook[currentQuestion]._id
          ? {
              ...question,
              selectedOption: option,
              isCorrect: option.tag === 'Correct',
            }
          : question
      )
    );
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, chapterErrorBook.length - 1));
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      const solvedQuestionIds = answeredQuestions
        .filter(question => question.isCorrect)
        .map(question => question.questionId);
        console.log(solvedQuestionIds)
      
      await updateErrorNoteMutation.mutateAsync(solvedQuestionIds);
      Toast.show({
        type: 'success',
        text1: 'Quiz submitted successfully',
        text2: 'Your progress has been saved',
      });
      router.replace('/errorbook');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to submit quiz',
        text2: 'Please try again',
      });
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#9654F4" />
      </View>
    );
  }

  if (updateErrorNoteMutation.isPending) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4F9654" />
        <Text className="mt-4 text-lg font-mada-medium text-gray-600">Submitting Quiz...</Text>
        <Text className="mt-2 text-sm font-mada-medium text-gray-500">Please wait while we update your progress</Text>
      </View>
    );
  }

  
  if (isError || chapterErrorBook.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Image 
          source={require('../../../../assets/images/error.png')} 
          className="h-[50vh] w-full"
        />
        <Text className="mt-4 text-lg font-mada-medium text-gray-600">
          {isError ? "An error occurred" : "No questions available"}
        </Text>
        <Text className="mt-2 text-sm font-mada-medium text-gray-500">
          {isError ? "Please try again later" : "Check back soon for new questions"}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        nestedScrollEnabled={true}
      >
        <View className="items-center mb-5">
          <Text className="text-2xl font-mada-Bold">{chapterName}</Text>
          <Text className="text-lg text-gray-500 font-mada-medium">Error Book Quiz</Text>
        </View>
        <View className="bg-[#9654F42E] p-2.5 rounded-lg flex-row justify-between items-center mb-5">
          <Text className="text-base text-gray-600 font-mada-medium">
            Answered:{" "}
            <Text className="text-[#9654F4] font-mada-Bold">
              {
                answeredQuestions.filter((q) => q.selectedOption !== null)
                  .length
              }
            </Text>
            /{chapterErrorBook.length}
          </Text>
          <SubmitDialog onSubmit={handleSubmit} />
        </View>
        <Progress
          totalQuestions={chapterErrorBook.length}
          storedQuestionIds={answeredQuestions
            .filter((q) => q.selectedOption !== null)
            .map((q) => q.questionId)}
          currentQuestionId={chapterErrorBook[currentQuestion]._id}
        />
        <View className="border border-gray-300 rounded-lg p-2.5 mb-5 bg-white">
          <Text className="text-lg text-gray-500 mb-2.5 font-mada-medium">
            Question {currentQuestion + 1} :
          </Text>
          <ScrollView
            className="max-h-[48vh]"
            automaticallyAdjustKeyboardInsets={true}
            nestedScrollEnabled={true}
          >
            <Question question={chapterErrorBook[currentQuestion].question} />
            <Options
              options={chapterErrorBook[currentQuestion].question.options}
              selectedOption={answeredQuestions[currentQuestion].selectedOption}
              handleOptionChange={handleOptionChange}
              attemptedOption={{
                question: {
                  question: chapterErrorBook[currentQuestion].question,
                  studentAnswer:
                    answeredQuestions[currentQuestion].selectedOption?.name ||
                    "",
                },
              }}
            />
          </ScrollView>
        </View>
      </ScrollView>
      <View className="flex-row justify-between p-4 bg-white border-t border-gray-200 max-h-[10vh]">
        <TouchableOpacity
          onPress={handlePrevQuestion}
          className="bg-white border border-gray-300 px-5 py-1 rounded"
        >
          <Text className="font-mada-Bold">Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextQuestion}
          className="bg-[#9654F4] px-5 py-1 rounded"
        >
          <Text className="text-white font-mada-Bold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Attempt;