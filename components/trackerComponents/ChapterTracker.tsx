import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { TTrackerProps } from "../../types/types";
import { capitalizeFirstLetter, getFormattedDate } from "../../helpers/utils";
import { useState } from "react";
import ChapterRevisionDateTable from "./ChapterRevisionDateTable";
import TrackerGraph from "./TrackerGraph";

const ChapterTracker = ({ item }: { item: TTrackerProps }) => {
  const [viewMore, setViewMore] = useState(false);

  return (
    <View className="border border-input-border rounded-lg p-4 mb-4">
      {viewMore ? (
        <ChapterRevisionDateTable item={item} setViewMore={setViewMore} />
      ) : (
        <>
          <View className="flex-row items-center">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="basis-[60%] capitalize text-lg font-mada-semibold"
            >
              {item.chapter.name}
            </Text>
            <View className="flex-1 items-end justify-end">
              <TouchableOpacity
                className="w-20 h-8 bg-primary/10 rounded-md items-center justify-center"
                onPress={() => setViewMore(true)}
              >
                <Text className="text-xs text-primary font-mada-semibold leading-tight">
                  View More
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TrackerGraph item={item} />

          <View className="border border-input-border rounded-lg h-56">
            <View className="flex-row items-center justify-between p-3 bg-primary/10 rounded-t-lg">
              <Text className="text-center flex-1 text-xs leading-tight font-mada-medium">
                Topics
              </Text>
              <Text className="flex-1 text-center text-xs font-mada-medium leading-tight">
                Revision Freq
              </Text>
              <Text className=" flex-1 text-center text-xs font-mada-medium leading-tight">
                Last Revision
              </Text>
              <Text className="flex-1 text-center text-xs font-mada-medium leading-tight">
                Efficiency
              </Text>
            </View>

            <ScrollView
              className="flex-1"
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
            >
              {item && item.topics.length > 0 ? (
                item.topics.map((topic) => (
                  <View
                    key={topic.name}
                    className="flex-row items-start justify-between p-2"
                  >
                    <Text className="flex-1 text-xs leading-tight font-mada-medium">
                      {capitalizeFirstLetter(topic.name)}
                    </Text>
                    <Text className="flex-1 text-center text-xs leading-tight font-mada-medium">
                      {topic.plannerFrequency}
                    </Text>
                    <Text className="flex-1 text-center text-xs leading-tight font-mada-medium">
                      {getFormattedDate(
                        new Date(
                          topic.studiedAt[topic.studiedAt.length - 1].date!
                        )
                      )}
                    </Text>
                    <Text className="flex-1 text-center text-xs leading-tight font-mada-medium">
                      {Math.round(topic.overall_efficiency!)}%
                    </Text>
                  </View>
                ))
              ) : (
                <View className="flex-1">
                  <Text className="text-center font-mada-semibold text-tab-item-gray leading-tight text-lg">
                    No Topics to track!
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export default ChapterTracker;
