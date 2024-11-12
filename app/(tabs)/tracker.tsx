import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { useAppSelector } from "../../services/redux/hooks";
import { router, useLocalSearchParams } from "expo-router";
import { useGetUserTracker } from "../../services/queries/trackerQuery";
import SubjectOverview from "../../components/trackerComponents/SubjectOverview";
import ChapterTracker from "../../components/trackerComponents/ChapterTracker";
import { useEffect } from "react";
import clsx from "clsx";
import { colors } from "../../constants/constants";

const Tracker = () => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  const params = useLocalSearchParams<{ subject?: string }>();

  const activeSubject = params.subject ?? userSubjects?.[0]?.name;

  const {
    data: trackerData,
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserTracker(activeSubject!);

  useEffect(() => {
    if (activeSubject) {
      refetch();
    }
  }, [activeSubject, refetch]);

  return (
    <View className="flex-1 bg-white p-3 mb-16">
      <View className="flex-row items-center justify-between mb-5">
        {userSubjects?.map((subject) => (
          <Pressable
            key={subject?.name}
            onPress={() => router.setParams({ subject: subject?.name })}
            className={clsx(
              "h-9 px-4 border items-center justify-center rounded-lg",
              subject?.name === activeSubject
                ? "border-primary bg-primary/10"
                : "border-tab-item-gray bg-transparent"
            )}
          >
            <Text
              className={clsx(
                "capitalize text-sm font-mada-semibold",
                subject?.name === activeSubject
                  ? "text-primary"
                  : "text-tab-item-gray"
              )}
            >
              {subject?.name}
            </Text>
          </Pressable>
        ))}
      </View>

      {isFetching || isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={25} color={colors.primary} />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-base text-gray-300 font-mada-semibold">
            {error.message}
          </Text>
        </View>
      ) : (
        <FlatList
          data={
            trackerData && trackerData.tracker && trackerData.tracker.length > 0
              ? trackerData.tracker
              : []
          }
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ChapterTracker key={item._id} item={item} />
          )}
          ListHeaderComponent={() => (
            <SubjectOverview
              subject={
                userSubjects?.filter(
                  (subject) => subject?.name === activeSubject
                )[0]
              }
            />
          )}
          ListEmptyComponent={() => (
            <View className="w-full my-10">
              <Text className="text-center font-mada-semibold text-lg leading-tight text-tab-item-gray">
                No chapter to track!
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Tracker;
