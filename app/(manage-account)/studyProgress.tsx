import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/redux/hooks";
import Animated from "react-native-reanimated";
import clsx from "clsx";
import {
  useGetChapterTopics,
  useGetSubjectChapters,
} from "../../services/queries/questionQuery";
import MultiSelect from "../../components/shared/MultiSelect";
import {
  capitalizeFirstLetter,
  filterItemsBySearch,
} from "../../helpers/utils";
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
import { setUser } from "../../services/redux/slices/userSlice";
import TabNav from "../../components/shared/TabNav";

const StudyProgress = () => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const userSubjects = user?.academic.subjects;
  const userStandard = user?.academic.standard;

  const [activeSubject, setActiveSubject] = useState(userSubjects?.[0].name);

  const form = useForm<z.infer<typeof StudyDataFormSchema>>({
    resolver: zodResolver(StudyDataFormSchema),
  });

  const selectedChapter = form.watch("chapterName");
  const isSelectedChapter = !!selectedChapter;

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
    data: topicsData,
    isFetching: topicsFetching,
    isLoading: topicsLoading,
    isSuccess: topicsFetchingSuccess,
    isFetched: topicsFetched,
    refetch: refetchTopics,
  } = useGetChapterTopics(
    activeSubject!,
    selectedChapter?._id || "",
    userStandard!
  );

  useEffect(() => {
    form.setValue("topicNames", []);
    refetchTopics();
    if (topicsFetchingSuccess || topicsFetched) {
      const topicNames =
        topicsData?.topics.map((topic) => ({
          _id: topic._id,
          name: topic.name,
          subtopics: [],
        })) || [];
      form.setValue("topicNames", topicNames);
    }
  }, [
    activeSubject,
    selectedChapter,
    refetchTopics,
    form.setValue,
    topicsFetched,
    topicsFetchingSuccess,
  ]);

  const { mutateAsync: saveStudyData, isPending: savingStudyData } =
    useSaveStudyData();

  const { mutateAsync: createPlanner, isPending: creatingPlanner } =
    useCreatePlanner();
  const { mutateAsync: allocateBackTopics, isPending: allocatingBackTopics } =
    useAllocateBackTopics();

  const onSubmitStudyData = async (
    data: z.infer<typeof StudyDataFormSchema>
  ) => {
    const formattedData = {
      tag: "unrevised_topic",
      topics: data.topicNames.map((topic) => ({
        _id: topic._id,
        name: topic.name,
        subtopics: [],
      })),
      chapter: {
        _id: data?.chapterName?._id,
        name: data?.chapterName?.name,
      },
      subject: activeSubject!,
      standard: userStandard!,
    };

    try {
      let plannerResponse;

      const studyDataResponse = await saveStudyData(formattedData);
      if (user && user.planner === false) {
        plannerResponse = await createPlanner();
        dispatch(setUser({ ...user, planner: true }));
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
    <View className="flex-1 bg-white p-3">
      <Text className="text-base font-mada-medium leading-tight px-12 my-2">
        Select the chapters and topics you've finished in your classes.
      </Text>

      <View className="bg-primary/10 rounded-xl py-3 px-4 my-2">
        <TabNav
          items={userSubjects!}
          activeItem={activeSubject!}
          setActiveItem={setActiveSubject}
          width={Dimensions.get("screen").width - 56}
          height={40}
          containerClassName="bg-white justify-between h-9"
          itemClassName="flex-1"
          itemTextClassName="text-lg"
        />

        <View className="mt-5">
          <Controller
            name="chapterName"
            control={form.control}
            render={({ field }) => (
              <Select
                label="Chapter"
                labelStyle="text-xl ml-1"
                inputStyle="w-full h-12"
                placeholder="Select a chapter"
                items={filterItemsBySearch(
                  chapterData?.chapters.map((chapter) => ({
                    _id: chapter._id,
                    label: chapter.name,
                    value: chapter.name,
                  })) || [],
                  searchValue
                )}
                defaultValue={field.value}
                onValueChange={field.onChange}
                loading={chaptersLoading}
                fetching={chaptersFetching}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            )}
          />
        </View>
        {form.formState.errors &&
        form.formState.errors.chapterName &&
        form.formState.errors.chapterName?.message ? (
          <Text className="text-xs text-leadlly-red font-mada-medium -mt-2.5 mb-2 mx-1">
            {form.formState.errors.chapterName?.message}
          </Text>
        ) : null}
        {form.formState.errors &&
        form.formState.errors.topicNames &&
        form.formState.errors.topicNames?.message ? (
          <Text className="text-xs text-leadlly-red font-mada-medium -mt-2.5 mb-2 mx-1">
            {form.formState.errors.topicNames?.message}
          </Text>
        ) : null}

        {isSelectedChapter && (topicsFetching || topicsLoading) ? (
          <View className="flex-row items-start space-x-2">
            <ActivityIndicator size={10} color={"black"} />

            <Text className="flex-1 text-sm font-mada-medium text-black leading-4 mb-2">
              Please wait while topics for the selected chapter is being
              added...
            </Text>
          </View>
        ) : isSelectedChapter && (topicsFetchingSuccess || topicsFetched) ? (
          <Text className="text-sm font-mada-medium text-black leading-4 mb-2 -mt-2">
            Topics for the selected chapter has been added.
          </Text>
        ) : null}

        {/* <View>
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
                    _id: topic._id,
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
        </View> */}

        <View className="items-center justify-center">
          <TouchableOpacity
            className={clsx(
              "w-20 h-8 bg-primary rounded-md items-center justify-center",
              savingStudyData ||
                creatingPlanner ||
                allocatingBackTopics ||
                topicsFetching ||
                (topicsLoading && "opacity-70")
            )}
            disabled={
              savingStudyData ||
              creatingPlanner ||
              allocatingBackTopics ||
              topicsFetching ||
              topicsLoading
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
    </View>
  );
};

export default StudyProgress;
