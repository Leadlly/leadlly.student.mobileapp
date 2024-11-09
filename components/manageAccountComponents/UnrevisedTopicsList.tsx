import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  useDeleteUnrevisedTopics,
  useGetUnrevisedTopics,
} from "../../services/queries/studyDataQuery";
import { Chapter, Topic, TRevisionProps } from "../../types/types";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { colors } from "../../constants/constants";
import Toast from "react-native-toast-message";
import { useState } from "react";

interface ChapterData extends Chapter {
  topics: Topic[];
}

const UnrevisedTopicsList = () => {
  const [deletingItem, setDeletingItem] = useState<string | null>(null);

  const { data, isLoading } = useGetUnrevisedTopics();

  const mergedChapterData: ChapterData[] | undefined =
    data && data.data
      ? data.data?.reduce((acc: ChapterData[], curr: TRevisionProps) => {
          const existingChapter = acc.find(
            (ch) => ch.name === curr.chapter.name
          );

          if (existingChapter) {
            existingChapter.topics.push(curr.topic);
          } else {
            acc.push({
              id: curr.chapter.id,
              name: curr.chapter.name,
              topics: [curr.topic],
              studiedAt: curr.chapter.studiedAt,
              level: curr.chapter.level,
              overall_efficiency: curr.chapter.overall_efficiency,
              plannerFrequency: curr.chapter.plannerFrequency,
              total_questions_solved: curr.chapter.total_questions_solved,
            });
          }

          return acc;
        }, [])
      : [];

  const { mutateAsync: deleteUnrevisedTopics, isPending: deleting } =
    useDeleteUnrevisedTopics();

  const handleDeleteUnrevisedTopics = async (data: { chapterName: string }) => {
    try {
      setDeletingItem(data.chapterName);
      const res = await deleteUnrevisedTopics(data);
      Toast.show({
        type: "success",
        text1: res.message,
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    } finally {
      setDeletingItem(null);
    }
  };

  return (
    <View className="flex-1 my-2">
      <View className="flex-row items-center justify-between bg-input-border rounded-t-md h-11 px-4">
        <View className="flex-row items-center gap-x-1 w-40">
          <AntDesign name="filetext1" size={10} color="black" />
          <Text className="text-sm font-mada-medium leading-none text-tab-item-gray">
            List of chapters
          </Text>
        </View>
        <View className="flex-1 items-center ml-4">
          <Text className="text-sm font-mada-medium leading-none text-tab-item-gray">
            Topics cover
          </Text>
        </View>
        <View className="flex-1 items-center ml-4">
          <Text className="text-sm font-mada-medium leading-none text-tab-item-gray">
            Actions
          </Text>
        </View>
      </View>

      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
        className="flex-1 bg-white border border-input-border border-t-0 rounded-b-md"
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size={"small"} color={colors.primary} />
          </View>
        ) : mergedChapterData && mergedChapterData.length > 0 ? (
          mergedChapterData.map((item, index) => (
            <View
              key={item.id}
              className="flex-row items-center justify-between p-4 border-b border-input-border"
            >
              <View className="flex-row items-start gap-x-1 w-40">
                <Text className="text-sm font-mada-medium leading-tight">
                  {index + 1}.
                </Text>
                <Text className="text-sm font-mada-medium leading-tight">
                  {capitalizeFirstLetter(item.name)}
                </Text>
              </View>
              <View className="flex-1 items-center ml-4">
                <Text className="text-sm font-mada-medium leading-tight">
                  {item.topics.length}
                </Text>
              </View>
              <View className="flex-1 items-center ml-4">
                <Pressable
                  onPress={() =>
                    handleDeleteUnrevisedTopics({ chapterName: item.name })
                  }
                  disabled={deleting && deletingItem === item.name}
                  className="border border-input-border rounded w-5 h-5 items-center justify-center"
                >
                  {deleting && deletingItem === item.name ? (
                    <ActivityIndicator size={10} color={"black"} />
                  ) : (
                    <AntDesign name="close" size={12} color="black" />
                  )}
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <View className="flex-1 h-20 items-center justify-center">
            <Text className="text-base text-tab-item-gray leading-none font-mada-medium">
              No topics yet!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default UnrevisedTopicsList;
