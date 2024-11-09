import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ISubject } from "../../types/types";
import clsx from "clsx";
import {
  useGetSubjectChapters,
  useGetTopicsWithSubTopics,
} from "../../services/queries/questionQuery";
import MultiSelect from "../shared/MultiSelect";
import Select from "../shared/Select";
import { useSaveStudyData } from "../../services/queries/studyDataQuery";
import Toast from "react-native-toast-message";
import { useUpdatePlanner } from "../../services/queries/plannerQuery";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudyDataFormSchema } from "../../schemas/studyDataFormSchema";
import ModalComponent from "../shared/ModalComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../constants/constants";

const NewTopicLearntForm = ({
  activeSubject,
  setActiveSubject,
  userStandard,
  userSubjects,
  modalVisible,
  setModalVisible,
}: {
  activeSubject: string;
  setActiveSubject: (activeSubject: string | null) => void;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  userStandard: number;
  userSubjects: ISubject[];
}) => {
  const [selectedValues, setSelectedValues] = useState<
    Array<{
      _id: string;
      name: string;
      subItems?: Array<{ _id: string; name: string }>;
    }>
  >([]);

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
    form.setValue("chapterName", null);
    refetchChapter();
  }, [activeSubject, refetchChapter, form.setValue]);

  const {
    data: topicsWithSubtopicsData,
    isFetching: topicsFetching,
    isLoading: topicsLoading,
    refetch: refetchTopics,
  } = useGetTopicsWithSubTopics(
    activeSubject,
    selectedChapter?._id,
    userStandard
  );

  useEffect(() => {
    form.setValue("topicNames", []);
    setSelectedValues([]);
    refetchTopics();
  }, [activeSubject, selectedChapter, refetchTopics, form.setValue]);

  const { mutateAsync: saveStudyData, isPending } = useSaveStudyData();

  const { mutateAsync: updatePlanner, isPending: updatingPlanner } =
    useUpdatePlanner();

  const onSubmit = async (data: z.infer<typeof StudyDataFormSchema>) => {
    const formattedData = {
      tag: "continuous_revision",
      topics: data.topicNames.map((topic) => ({
        _id: topic._id,
        name: topic.name,
        subtopics: topic.subItems,
      })),
      chapter: {
        _id: data?.chapterName?._id,
        name: data?.chapterName?.name,
      },
      subject: activeSubject!,
      standard: userStandard!,
    };

    try {
      const res = await saveStudyData(formattedData);
      const updatePlannerResponse = await updatePlanner();

      Toast.show({
        type: "success",
        text1: res.message ? res.message : "Study data saved successfully.",
        text2: updatePlannerResponse?.message
          ? updatePlannerResponse.message
          : "Planner updated successfully!",
      });

      form.reset({
        chapterName: null,
        topicNames: [],
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  return (
    <ModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      isCloseIcon={false}
    >
      <View className="p-3">
        <TouchableOpacity
          className="mb-5"
          onPress={() => {
            setActiveSubject(null);
            setModalVisible(false);
          }}
        >
          <AntDesign name="arrowleft" size={22} color={colors.tabItemGray} />
        </TouchableOpacity>

        <View className="flex-row items-center justify-between">
          {userSubjects?.map((subject) => (
            <Pressable
              key={subject?.name}
              onPress={() => setActiveSubject(subject?.name)}
              className={clsx(
                "flex-1 h-9 items-center justify-center",
                activeSubject === subject?.name && "border-b-2 border-primary"
              )}
            >
              <Text
                className={clsx(
                  "capitalize text-base font-mada-medium leading-tight text-tab-item-gray",
                  activeSubject === subject?.name && "text-primary"
                )}
              >
                {subject?.name}
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
                      _id: chapter._id,
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
                    topicsWithSubtopicsData?.topics.map((topic) => ({
                      _id: topic._id,
                      name: topic.name,
                      subItems: topic.subtopics,
                    })) || []
                  }
                  loading={topicsLoading}
                  fetching={topicsFetching}
                  maxCount={3}
                  selectedValues={selectedValues}
                  setSelectedValues={setSelectedValues}
                />
              )}
            />
          </View>

          <View className="items-center justify-center mt-5">
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
    </ModalComponent>
  );
};

export default NewTopicLearntForm;
