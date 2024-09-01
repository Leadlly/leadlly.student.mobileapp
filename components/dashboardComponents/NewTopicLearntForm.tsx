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
  const [chapterListOpen, setChapterListOpen] = useState(false);
  const [chapterItemValue, setChapterItemValue] = useState(null);

  const [topicListOpen, setTopicListOpen] = useState(false);
  const [topicItemsValue, setTopicItemsValue] = useState([]);

  const onChapterListOpen = useCallback(() => {
    setTopicListOpen(false);
  }, []);

  const onTopicListOpen = useCallback(() => {
    setChapterListOpen(false);
  }, []);

  const {
    data: chapterData,
    isLoading: chaptersLoading,
    isFetching: chaptersFetching,
    refetch: refetchChapter,
  } = useGetSubjectChapters(activeSubject, userStandard);

  useEffect(() => {
    if (activeSubject) {
      setChapterItemValue(null);
      refetchChapter();
    }
  }, [activeSubject, refetchChapter]);

  const {
    data: topicsData,
    isFetching: topicsFetching,
    isLoading: topicsLoading,
    refetch: refetchTopics,
  } = useGetChapterTopics(activeSubject, chapterItemValue!, userStandard);

  useEffect(() => {
    if (activeSubject && chapterItemValue) {
      setTopicItemsValue([]);
      setTopicListOpen(false);
      refetchTopics();
    }
  }, [activeSubject, chapterItemValue, refetchTopics]);

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

  const onSubmit = async () => {
    if (isSavingDataError || isUpdatingPlannerError) {
      return Toast.show({
        type: "error",
        text1: savingDataError?.message || updatingPlannerError?.message,
      });
    }

    if (chapterItemValue && topicItemsValue.length > 0) {
      const formattedData = {
        tag: "continuous_revision",
        topics: topicItemsValue.map((topic) => ({ name: topic })),
        chapter: {
          name: chapterItemValue,
        },
        subject: activeSubject,
        standard: userStandard,
      };

      const res = await saveStudyData(formattedData);
      await updatePlanner();
      Toast.show({
        type: "success",
        text1: res.message,
      });

      setChapterItemValue(null);
      setTopicItemsValue([]);
    }
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

      <View className="mt-5 h-48">
        <Select
          items={
            chapterData?.chapters.map((chapter) => ({
              label: capitalizeFirstLetter(chapter.name)!,
              value: chapter.name,
            })) || []
          }
          open={chapterListOpen}
          setOpen={setChapterListOpen}
          onOpen={onChapterListOpen}
          value={chapterItemValue}
          setValue={setChapterItemValue}
          loading={chaptersLoading}
          fetching={chaptersFetching}
        />

        <MultiSelect
          items={
            topicsData?.topics.map((topic) => ({
              label: capitalizeFirstLetter(topic.name)!,
              value: topic.name,
            })) || []
          }
          onOpen={onTopicListOpen}
          open={topicListOpen}
          setOpen={setTopicListOpen}
          value={topicItemsValue}
          setValue={(val) => setTopicItemsValue(val)}
          loading={topicsLoading}
          fetching={topicsFetching}
        />

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
            onPress={() => onSubmit()}
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
