import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import ModalComponent from "../shared/ModalComponent";
import { TQuizAnswerProps, TQuizQuestionProps } from "../../types/types";
import * as Progress from "react-native-progress";
import { capitalizeFirstLetter, widthPercentage } from "../../helpers/utils";
import { colors } from "../../constants/constants";
import { useState } from "react";
import RenderHtml from "react-native-render-html";
import clsx from "clsx";
import Feather from "@expo/vector-icons/Feather";
import { useSaveDailyQuiz } from "../../services/queries/dailyQuizQuery";
import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "../../services/redux/hooks";
import {
  dailyQuizAttemptedQuestions,
  filterCompletedTopics,
} from "../../services/redux/slices/dailyQuizSlice";
import LottieView from "lottie-react-native";

const QuestionsModal = ({
  modalVisible,
  setModalVisible,
  questions,
  topic,
}: {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  topic: { name: string; _id: string } | null;
  questions: TQuizQuestionProps[];
}) => {
  const { width } = useWindowDimensions();

  const dispatch = useAppDispatch();

  const { dailyQuizzes } = useAppSelector((state) => state.dailyQuizzes);

  const dailyQuizCurrentTopic = dailyQuizzes.find(
    (quiz) => quiz.topicName === topic?.name
  );

  const [activeQuestion, setActiveQuestion] = useState(
    dailyQuizCurrentTopic ? dailyQuizCurrentTopic?.attemptedQuestions.length : 0
  );

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [optionSelected, setOptionSelected] = useState(false);

  const onAnswerSelect = (answer: string, optionTag: string, index: number) => {
    setSelectedAnswerIndex(index);

    setSelectedAnswer(answer);
    setOptionSelected(true);

    const formattedData: TQuizAnswerProps = {
      question: questions[activeQuestion]?._id,
      studentAnswer: answer,
      isCorrect: optionTag === "Correct",
      tag: "daily_quiz",
    };

    if (
      !dailyQuizCurrentTopic?.attemptedQuestions.some(
        (quiz) => quiz.question === formattedData.question
      )
    ) {
      dispatch(
        dailyQuizAttemptedQuestions({
          topicName: topic?.name!,
          attemptedQuestions: [formattedData],
        })
      );
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    setSelectedAnswer("");
    setOptionSelected(false);

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    }
  };

  const { mutateAsync: saveDailyQuiz, isPending: savingDailyQuiz } =
    useSaveDailyQuiz();

  const onHandleSubmit = async () => {
    try {
      const res = await saveDailyQuiz({
        topic: { name: topic?.name! },
        questions: dailyQuizCurrentTopic?.attemptedQuestions!,
      });

      if (
        dailyQuizCurrentTopic &&
        dailyQuizCurrentTopic.attemptedQuestions.length === questions.length
      ) {
        dispatch(filterCompletedTopics({ topicName: topic?.name! }));
      }

      if (res.success) {
        Toast.show({
          type: "success",
          text1: res.message,
        });

        setModalVisible(false);
      } else {
        Toast.show({
          type: "error",
          text1: res.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  const handleBackSubmit = async () => {
    if (
      dailyQuizCurrentTopic &&
      dailyQuizCurrentTopic?.attemptedQuestions?.length > 0
    ) {
      await onHandleSubmit();
    }
    setModalVisible(false);
  };

  return (
    <ModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      isCloseIcon={false}
      isSavingDailyQuiz={true}
      handleBackSubmit={handleBackSubmit}
      className="flex-1"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 15 }}
      >
        {savingDailyQuiz ? (
          <View className="min-h-[350px] items-center justify-center space-y-3">
            <ActivityIndicator size={25} color={colors.primary} />
            <View className="items-center justify-center">
              <Text className="text-sm text-secondary-text font-mada-medium text-center">
                Saving Quiz
              </Text>
              <Text className="text-sm text-secondary-text font-mada-medium text-center">
                Please wait...
              </Text>
            </View>
          </View>
        ) : (
          <>
            {questions && questions.length > 0 && questions[activeQuestion] ? (
              <>
                <View className="flex-row items-start justify-between gap-x-3">
                  <TouchableOpacity onPress={handleBackSubmit}>
                    <AntDesign name="arrowleft" size={22} color="black" />
                  </TouchableOpacity>
                  <View className="flex-1">
                    <Text className="text-lg font-mada-semibold leading-tight text-center">
                      Quiz on {capitalizeFirstLetter(topic?.name)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={onHandleSubmit}
                    disabled={
                      (dailyQuizCurrentTopic &&
                        dailyQuizCurrentTopic?.attemptedQuestions.length <=
                          0) ||
                      savingDailyQuiz
                    }
                    className={clsx(
                      "w-[72px] h-9 rounded-md bg-primary items-center justify-center",
                      ((dailyQuizCurrentTopic &&
                        dailyQuizCurrentTopic?.attemptedQuestions.length <=
                          0) ||
                        savingDailyQuiz) &&
                        "opacity-70"
                    )}
                  >
                    <Text className="text-white font-mada-semibold leading-none">
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row items-center justify-center gap-x-3 my-5">
                  <Progress.Bar
                    progress={
                      dailyQuizCurrentTopic
                        ? dailyQuizCurrentTopic?.attemptedQuestions?.length /
                          questions?.length
                        : 0
                    }
                    width={widthPercentage(65)}
                    unfilledColor={colors.inputBorder}
                    borderWidth={0}
                    color={colors.primary}
                  />

                  <Text className="text-base font-mada-Bold leading-tight">
                    {dailyQuizCurrentTopic
                      ? dailyQuizCurrentTopic?.attemptedQuestions?.length
                      : 0}
                    /{questions?.length}
                  </Text>
                </View>

                <View className="mb-5 items-center justify-center">
                  <View className="flex-row items-center justify-between border border-input-border p-0.5 rounded-md">
                    {questions.map((ques, index) => (
                      <TouchableOpacity
                        key={ques._id}
                        disabled={dailyQuizCurrentTopic?.attemptedQuestions.some(
                          (quiz) => quiz.question === ques._id
                        )}
                        onPress={() => {
                          setSelectedAnswerIndex(null);
                          setSelectedAnswer("");
                          setOptionSelected(false);
                          setActiveQuestion(index);
                        }}
                        className={clsx(
                          "w-10 h-6 rounded items-center justify-center",
                          activeQuestion === index && "bg-primary",
                          dailyQuizCurrentTopic?.attemptedQuestions.some(
                            (quiz) => quiz.question === ques._id
                          ) && "opacity-40"
                        )}
                      >
                        <Text
                          className={clsx(
                            "font-mada-medium text-[15px] leading-tight -mt-0.5",
                            activeQuestion === index && "text-white"
                          )}
                        >
                          Q{index + 1}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View className="flex-row items-start mb-5">
                  <Text className="text-base font-mada-medium leading-tight mr-2">
                    {activeQuestion + 1}.
                  </Text>

                  <View className="-my-3.5 flex-1">
                    <RenderHtml
                      contentWidth={width - 100}
                      source={{
                        html: questions[activeQuestion].question,
                      }}
                    />

                    {questions[activeQuestion].images.length > 0 ? (
                      <Image
                        source={{
                          uri: questions[activeQuestion].images[0].url,
                        }}
                        width={width - 100}
                        height={100}
                        resizeMode="contain"
                      />
                    ) : null}
                  </View>
                </View>

                <View className="space-y-3 flex-1">
                  {questions[activeQuestion].options.map((option, index) => (
                    <Pressable
                      key={option._id}
                      onPress={() =>
                        onAnswerSelect(option.name, option.tag, index)
                      }
                      disabled={
                        optionSelected && selectedAnswer !== option.name
                      }
                      className={clsx(
                        "flex-row items-start border border-input-border rounded-lg p-4",
                        optionSelected && option.tag === "Correct"
                          ? "border-leadlly-green bg-leadlly-green/10"
                          : selectedAnswerIndex === index &&
                              option.tag === "Incorrect"
                            ? "border-leadlly-red bg-leadlly-red/10"
                            : ""
                      )}
                    >
                      <View
                        className={clsx(
                          "mr-4 w-4 h-4 rounded-full border border-input-border items-center justify-center",
                          optionSelected && option.tag === "Correct"
                            ? "bg-leadlly-green/10 border-leadlly-green"
                            : selectedAnswerIndex === index &&
                                option.tag === "Incorrect"
                              ? "bg-leadlly-red/10 border-leadlly-red"
                              : ""
                        )}
                      >
                        {optionSelected && option.tag === "Correct" && (
                          <Feather
                            name="check"
                            size={10}
                            color={colors.leadllyGreen}
                          />
                        )}

                        {selectedAnswerIndex === index &&
                          option.tag === "Incorrect" && (
                            <AntDesign
                              name="close"
                              size={10}
                              color={colors.leadllyRed}
                            />
                          )}
                      </View>
                      <View className="-my-4 flex-1">
                        <RenderHtml
                          contentWidth={width - 120}
                          source={{ html: option.name }}
                        />
                      </View>
                    </Pressable>
                  ))}
                </View>

                <View className="items-center justify-center mt-5">
                  <TouchableOpacity
                    disabled={activeQuestion === questions.length - 1}
                    onPress={handleNextQuestion}
                    className={clsx(
                      "bg-primary rounded-md w-20 h-9 items-center justify-center",
                      activeQuestion === questions.length - 1 && "opacity-60"
                    )}
                  >
                    <Text className="text-white text-base font-mada-semibold leading-none">
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View className="h-40 w-full items-center justify-center space-y-4">
                <Text className="text-lg text-secondary-text font-mada-medium text-center leading-tight">
                  No questions available for this topic.
                </Text>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="border border-tab-item-gray items-center justify-center h-9 px-3 rounded-md"
                >
                  <Text className="text-sm font-mada-medium text-secondary-text leading-none">
                    Try other topics
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </ModalComponent>
  );
};

export default QuestionsModal;
