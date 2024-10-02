import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Modal,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../services/redux/hooks";
import {
  useGetChapterTopics,
  useGetSubjectChapters,
} from "../../services/queries/questionQuery";
import MultiSelect from "../../components/shared/MultiSelect";
import { capitalizeFirstLetter } from "../../helpers/utils";
import Select from "../../components/shared/Select";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { QuizDataFormSchema } from "../../schemas/QuizDataFromSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { colors } from "../../constants/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useCreateCustomQuiz } from "../../services/queries/quizQuery"; // Assume this hook exists

const CustomizedQuiz: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  const userSubjects = user?.academic.subjects;
  const userStandard = user?.academic.standard;

  const form = useForm<z.infer<typeof QuizDataFormSchema>>({
    resolver: zodResolver(QuizDataFormSchema),
  });

  const {
    subjectName,
    chapterName,
    topicNames,
    numberOfQuestions,
    difficulty,
  } = form.watch();

  const {
    data: chapterData,
    isLoading: chaptersLoading,
    isFetching: chaptersFetching,
    refetch: refetchChapter,
  } = useGetSubjectChapters(subjectName!, userStandard!);

  useEffect(() => {
    form.setValue("chapterName", "");
    refetchChapter();
  }, [subjectName, refetchChapter, form]);

  const {
    data: topicsData,
    isFetching: topicsFetching,
    isLoading: topicsLoading,
    refetch: refetchTopics,
  } = useGetChapterTopics(subjectName!, chapterName, userStandard!);

  useEffect(() => {
    form.setValue("topicNames", []);
    refetchTopics();
  }, [subjectName, chapterName, refetchTopics, form]);

  // const createCustomQuiz = useCreateCustomQuiz();

  const onSubmitCustomQuiz = async (
    data: z.infer<typeof QuizDataFormSchema>
  ) => {
    const quizData = {
      subject: data.subjectName,
      chapter: data.chapterName,
      topics: data.topicNames,
      numberOfQuestions: parseInt(data.numberOfQuestions),
      difficulty: data.difficulty,
      standard: userStandard!,
    };

    try {
      // const response = await createCustomQuiz.mutateAsync(quizData);
      Toast.show({
        type: "success",
        text1: "Custom quiz created successfully.",
        text2: "You can now start the quiz.",
      });
      form.reset();
      // Here you might want to navigate to the created quiz
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to create custom quiz",
        text2: error.message,
      });
    }
  };

  const onSaveDraft = () => {
    // Implement save to draft functionality here
    Toast.show({
      type: "success",
      text1: "Draft saved successfully.",
      text2: "You can continue editing later.",
    });
  };

  return (
    <ScrollView className=" p-3" showsVerticalScrollIndicator={false}>
      <View className="flex-1 max-w-full  border-2 border-primary items-center p-5 bg-[#F4EBFF] rounded-lg">
        <View className="flex-row justify-between items-center w-full mb-4">
          <Text className="text-lg font-medium">Customized Quiz</Text>
          <View className="flex-row items-center">
            <Text className="text-sm font-mada-medium text-[#6200EE] mr-2">
              Drafts(0)
            </Text>
          </View>
        </View>
        <View className="flex flex-1 flex-row items-center ">
          <View className="flex-1 mr-1">
            <Controller
              name="subjectName"
              control={form.control}
              render={({ field }) => (
                <Select
                  label="Subject Name"
                  inputStyle="text-xs h-10"
                  labelStyle="text-sm ml-1 text-gray-500"
                  listContainerStyle="h-36"
                  placeholder="Select subject"
                  items={
                    userSubjects?.map((subject) => ({
                      label: subject.name,
                      value: subject.name,
                    })) || []
                  }
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </View>
          <Controller
            name="numberOfQuestions"
            control={form.control}
            render={({ field }) => (
              <View className="mb-4  flex-1  justify-center gap-1 ">
                <Text className="text-sm ml-1 font-mada-medium text-gray-500">
                  Number of Questions
                </Text>
                <TextInput
                  className="p-2 h-10  bg-white border border-gray-300 rounded-lg"
                  keyboardType="numeric"
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Enter number of questions"
                />
              </View>
            )}
          />
        </View>
        <Controller
          name="chapterName"
          control={form.control}
          render={({ field }) => (
            <Select
              label="Chapter Name"
              inputStyle="w-full h-10"
              labelStyle="text-sm ml-1 text-gray-500"
              placeholder="Select a chapter"
              items={
                chapterData?.chapters.map((chapter) => ({
                  label: chapter.name,
                  value: chapter.name,
                })) || []
              }
              defaultValue={field.value}
              onValueChange={field.onChange}
              loading={chaptersLoading}
              fetching={chaptersFetching}
            />
          )}
        />
        <Controller
          name="topicNames"
          control={form.control}
          render={({ field }) => (
            <MultiSelect
              label="Topic Name"
              inputStyle="p-2 px-3"
              labelStyle="text-sm ml-1 text-gray-500"
              placeholder="Select topics"
              defaultValue={field.value}
              onValueChange={field.onChange}
              items={
                topicsData?.topics.map((topic) => ({
                  label: capitalizeFirstLetter(topic.name)!,
                  value: topic.name,
                })) || []
              }
              loading={topicsLoading}
              fetching={topicsFetching}
              maxCount={3}
            />
          )}
        />
        <Controller
          name="difficulty"
          control={form.control}
          render={({ field }) => (
            <View className="w-full mb-4">
              <Text className="text-sm ml-1 font-mada-semibold text-gray-500 mb-2">
                Difficulty
              </Text>
              <View className="flex-row justify-between gap-5">
                {["easy", "medium", "hard"].map((value) => (
                  <TouchableOpacity
                    key={value}
                    onPress={() => field.onChange(value)}
                    className="flex-1 items-center flex-row space-x-1"
                  >
                    {field.value === value ? (
                      <MaterialCommunityIcons
                        name="checkbox-outline"
                        size={24}
                        color={colors.primary}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="checkbox-blank-outline"
                        size={24}
                        color="gray"
                      />
                    )}
                    <Text
                      className={`font-mada-semibold ${
                        field.value === value ? "text-primary" : "text-gray-600"
                      }`}
                    >
                      {capitalizeFirstLetter(value)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        />
        <View className="w-full mb-4">
          {Object.keys(form.formState.errors).length > 0 && (
            <View className="w-full mb-4">
              <Text className="text-red-500 text-center">
                {Object.values(form.formState.errors)[0]?.message ||
                  "An error occurred"}
              </Text>
            </View>
          )}
          <View className="flex flex-row-reverse gap-5 items-center justify-between ">
            <TouchableOpacity
              className="px-5 py-1 border-2 border-primary bg-primary rounded-lg"
              onPress={form.handleSubmit(onSubmitCustomQuiz)}
              // disabled={createCustomQuiz.isPending}
            >
              {/* {createCustomQuiz.isPending ? ( */}
              {/* <ActivityIndicator size="small" color="white" /> */}
              {/* ) : ( */}
              <Text className="text-white text-center font-mada-semibold text-lg">
                Create Now
              </Text>
              {/* )} */}
            </TouchableOpacity>
            <TouchableOpacity
              className="px-5 py-1 border-gray-400 border-2 bg-white rounded-lg"
              onPress={onSaveDraft}
            >
              <Text className="text-gray-400 text-center font-mada-semibold text-lg">
                Save to Draft
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-1 justify-center items-center mb-20">
        <Image
          source={require("../../assets/images/customizequiz.png")}
          style={{ width: 200, height: 200, marginBottom: 20 }}
          resizeMode="contain"
        />
        <Text className="text-center text-gray-500 mt-2">
          Creating custom quizzes coming soon!
        </Text>
      </View>
    </ScrollView>
  );
};

export default CustomizedQuiz;
