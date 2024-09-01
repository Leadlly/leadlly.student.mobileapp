import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../services/redux/hooks";
import Animated from "react-native-reanimated";
import clsx from "clsx";
import {
  useGetChapterTopics,
  useGetSubjectChapters,
} from "../../services/queries/questionQuery";
import MultiSelect from "../../components/shared/MultiSelect";
import { capitalizeFirstLetter } from "../../helpers/utils";
import Select from "../../components/shared/Select";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { StudyDataFormSchema } from "../../schemas/studyDataFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import UnrevisedTopicsList from "../../components/manageAccountComponents/UnrevisedTopicsList";
import { useSaveStudyData } from "../../services/queries/studyDataQuery";
import Toast from "react-native-toast-message";
import {
  useAllocateBackTopics,
  useCreatePlanner,
} from "../../services/queries/plannerQuery";

const StudyProgress = () => {
  const user = useAppSelector((state) => state.user.user);

  const userSubjects = user?.academic.subjects;
  const userStandard = user?.academic.standard;

  const [activeSubject, setActiveSubject] = useState(userSubjects?.[0].name);

  const form = useForm<z.infer<typeof StudyDataFormSchema>>({
    resolver: zodResolver(StudyDataFormSchema),
  });

  const selectedChapter = form.watch("chapterName");
  const selectedTopics = form.watch("topicNames");

  const {
    data: chapterData,
    isLoading: chaptersLoading,
    isFetching: chaptersFetching,
    refetch: refetchChapter,
  } = useGetSubjectChapters(activeSubject!, userStandard!);

  useEffect(() => {
    if (activeSubject) {
      refetchChapter();
    }
  }, [activeSubject, refetchChapter]);

  const {
    data: topicsData,
    isFetching: topicsFetching,
    isLoading: topicsLoading,
    refetch: refetchTopics,
  } = useGetChapterTopics(activeSubject!, selectedChapter, userStandard!);

  useEffect(() => {
    if (activeSubject && selectedChapter) {
      refetchTopics();
    }
  }, [activeSubject, selectedChapter, refetchTopics]);

  const { mutateAsync: saveStudyData, isPending: savingStudyData } =
    useSaveStudyData();

  const { mutateAsync: createPlanner, isPending: creatingPlanner } =
    useCreatePlanner();
  const { mutateAsync: allocateBackTopics, isPending: allocatingBackTopics } =
    useAllocateBackTopics();

  const onSubmitStudyData = async () => {
    const formattedData = {
      tag: "unrevised_topic",
      topics: selectedTopics.map((topic) => ({ name: topic })),
      chapter: {
        name: selectedChapter,
      },
      subject: activeSubject!,
      standard: userStandard!,
    };

    try {
      let plannerResponse;

      const studyDataResponse = await saveStudyData(formattedData);
      if (user && user.planner === false) {
        plannerResponse = await createPlanner();
      } else if (user && user.planner === true) {
        plannerResponse = await allocateBackTopics();
      }

      Toast.show({
        type: "success",
        text1: studyDataResponse.message
          ? studyDataResponse.message
          : "Study data saved successfully.",
        text2: plannerResponse.message
          ? plannerResponse.message
          : "Planner updated.",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      className="flex-1 bg-white p-3"
    >
      <Text className="text-base font-mada-medium leading-tight px-12 my-3">
        Select the chapters and topics you've finished in your classes.
      </Text>

      <View className="bg-primary/10 rounded-xl py-3 px-4 my-2">
        <View className="flex-row border border-input-border p-1 rounded-lg items-center justify-between h-10 bg-white">
          {userSubjects?.map((subject) => (
            <Pressable
              key={subject.name}
              className="flex-1 justify-center items-center"
              onPress={() => setActiveSubject(subject.name)}
            >
              {activeSubject === subject.name && (
                <Animated.View className="bg-primary w-full h-full absolute inset-0 rounded" />
              )}
              <Text
                className={clsx(
                  "capitalize text-lg leading-none font-mada-semibold",
                  activeSubject === subject.name && "text-white"
                )}
              >
                {subject.name}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-5">
          <Controller
            name="chapterName"
            control={form.control}
            render={({ field }) => (
              <Select
                label="Chapter"
                labelStyle="text-xl ml-1"
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
        </View>

        <View>
          <Controller
            name="topicNames"
            control={form.control}
            render={({ field }) => (
              <MultiSelect
                label="Topics"
                labelStyle="text-xl ml-1"
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
        </View>

        <View className="items-center justify-center">
          <TouchableOpacity
            className="w-20 h-8 bg-primary rounded-md items-center justify-center"
            disabled={
              savingStudyData || creatingPlanner || allocatingBackTopics
            }
            onPress={form.handleSubmit(onSubmitStudyData)}
          >
            {savingStudyData || creatingPlanner || allocatingBackTopics ? (
              <ActivityIndicator size={"small"} color={"white"} />
            ) : (
              <Text className="text-white text-base font-mada-semibold leading-none">
                Add
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <UnrevisedTopicsList />
    </ScrollView>
  );
};

export default StudyProgress;
