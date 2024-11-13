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
import {
  useSaveStudyData,
  useStoreUnrevisedTopics,
} from "../../services/queries/studyDataQuery";
import Toast from "react-native-toast-message";
import {
  useAllocateBackTopics,
  useCreatePlanner,
} from "../../services/queries/plannerQuery";
import { setUser } from "../../services/redux/slices/userSlice";
import TabNav from "../../components/shared/TabNav";
import MultiSelectWithoutAccordion from "../../components/shared/MultiSelectWithoutAccordion";

export const UnrevisedTopicsFormSchema = z.object({
  chapters: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    )
    .min(1, { message: "Please select at least one chapter" })
    .default([]),
});

const StudyProgress = () => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const userSubjects = user?.academic.subjects;
  const userStandard = user?.academic.standard;

  const [activeSubject, setActiveSubject] = useState(userSubjects?.[0].name);

  const form = useForm<z.infer<typeof UnrevisedTopicsFormSchema>>({
    resolver: zodResolver(UnrevisedTopicsFormSchema),
  });

  const {
    data: chapterData,
    isLoading: chaptersLoading,
    isFetching: chaptersFetching,
    refetch: refetchChapter,
  } = useGetSubjectChapters(activeSubject!, userStandard!);

  useEffect(() => {
    form.setValue("chapters", []);
    refetchChapter();
  }, [activeSubject, refetchChapter, form.setValue, userStandard]);

  const { mutateAsync: saveUnrevisedTopics, isPending: savingStudyData } =
    useStoreUnrevisedTopics();

  const { mutateAsync: createPlanner, isPending: creatingPlanner } =
    useCreatePlanner();
  const { mutateAsync: allocateBackTopics, isPending: allocatingBackTopics } =
    useAllocateBackTopics();

  const onSubmitUnrevisedData = async (
    data: z.infer<typeof UnrevisedTopicsFormSchema>
  ) => {
    const formattedData = {
      tag: "unrevised_topic",
      chapterIds: data.chapters.map((item) => item._id),
      subject: activeSubject!,
      standard: userStandard!,
    };

    try {
      let plannerResponse;

      const studyDataResponse = await saveUnrevisedTopics(formattedData);
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
        chapters: [],
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
            name="chapters"
            control={form.control}
            render={({ field }) => (
              <MultiSelectWithoutAccordion
                label="Chapter"
                labelStyle="text-xl ml-1"
                placeholder="Select a chapter"
                items={filterItemsBySearch(
                  chapterData?.chapters.map((chapter) => ({
                    _id: chapter._id,
                    name: chapter.name,
                  })) || [],
                  searchValue
                )}
                defaultValue={field.value}
                onValueChange={field.onChange}
                loading={chaptersLoading}
                fetching={chaptersFetching}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                maxCount={3}
              />
            )}
          />
        </View>
        {form.formState.errors &&
        form.formState.errors.chapters &&
        form.formState.errors.chapters?.message ? (
          <Text className="text-xs text-leadlly-red font-mada-medium -mt-2.5 mb-2 mx-1">
            {form.formState.errors.chapters?.message}
          </Text>
        ) : null}

        <View className="items-center justify-center">
          <TouchableOpacity
            className={clsx(
              "w-20 h-8 bg-primary rounded-md items-center justify-center",
              savingStudyData ||
                creatingPlanner ||
                (allocatingBackTopics && "opacity-70")
            )}
            disabled={
              savingStudyData || creatingPlanner || allocatingBackTopics
            }
            onPress={form.handleSubmit(onSubmitUnrevisedData)}
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
