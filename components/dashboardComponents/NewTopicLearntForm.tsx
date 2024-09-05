import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ISubject } from "../../types/types";
import clsx from "clsx";
import {
  useGetChapterTopics,
  useGetSubjectChapters,
} from "../../services/queries/questionQuery";
import { capitalizeFirstLetter } from "../../helpers/utils";
import MultiSelect from "../shared/MultiSelect";
import Select from "../shared/Select";
import { useSaveStudyData } from "../../services/queries/studyDataQuery";
import Toast from "react-native-toast-message";
import { useUpdatePlanner } from "../../services/queries/plannerQuery";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudyDataFormSchema } from "../../schemas/studyDataFormSchema";

const NewTopicLearntForm = ({
  activeSubject,
  setActiveSubject,
  userStandard,
  userSubjects,
}: {
  activeSubject: string;
  setActiveSubject: (activeSubject: string | null) => void;
  userStandard: number;
  userSubjects: ISubject[];
}) => {
  const form = useForm<z.infer<typeof StudyDataFormSchema>>({
    resolver: zodResolver(StudyDataFormSchema),
  });

  const selectedChapter = form.watch("chapterName");

  const {
    data: chapterData,
    isLoading: chaptersLoading,
    isFetching: chaptersFetching,
    refetch: refetchChapter,
  } = useGetSubjectChapters(activeSubject!, userStandard!);

  useEffect(() => {
    form.setValue("chapterName", "");
    refetchChapter();
  }, [activeSubject, refetchChapter, form.setValue]);

  const {
    data: topicsData,
    isFetching: topicsFetching,
    isLoading: topicsLoading,
    refetch: refetchTopics,
  } = useGetChapterTopics(activeSubject!, selectedChapter, userStandard!);

  useEffect(() => {
    form.setValue("topicNames", []);
    refetchTopics();
  }, [activeSubject, selectedChapter, refetchTopics, form.setValue]);

  const {
    mutateAsync: saveStudyData,
    isPending,
    isError: isSavingDataError,
    error: savingDataError,
  } = useSaveStudyData();

  const {
    mutateAsync: updatePlanner,
    isPending: updatingPlanner,
    isError: isUpdatingPlannerError,
    error: updatingPlannerError,
  } = useUpdatePlanner();

  const onSubmit = async (data: z.infer<typeof StudyDataFormSchema>) => {
    const formattedData = {
      tag: "continuous_revision",
      topics: data.topicNames.map((topic) => ({ name: topic })),
      chapter: {
        name: data.chapterName,
      },
      subject: activeSubject!,
      standard: userStandard!,
    };

    console.log(formattedData);
  };

  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between">
        {userSubjects.map((subject) => (
          <Pressable
            key={subject.name}
            onPress={() => setActiveSubject(subject.name)}
            className={clsx(
              "border border-input-border rounded-lg w-20 h-9 items-center justify-center",
              activeSubject === subject.name && "bg-primary/10 border-primary"
            )}
          >
            <Text
              className={clsx(
                "capitalize text-sm font-mada-medium leading-tight text-tab-item-gray",
                activeSubject === subject.name && "text-primary"
              )}
            >
              {subject.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="mt-5">
        <View>
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

        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="border border-tab-item-gray items-center justify-center w-20 h-10 rounded-lg"
            onPress={() => setActiveSubject(null)}
          >
            <Text className="text-sm font-mada-semibold leading-tight">
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={clsx(
              "bg-primary items-center justify-center w-20 h-10 rounded-lg",
              isPending || (updatingPlanner && "opacity-70")
            )}
            disabled={isPending || updatingPlanner}
            onPress={form.handleSubmit(onSubmit)}
          >
            {isPending || updatingPlanner ? (
              <ActivityIndicator size={"small"} color={"white"} />
            ) : (
              <Text className="text-white text-sm font-mada-semibold leading-tight">
                Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewTopicLearntForm;
