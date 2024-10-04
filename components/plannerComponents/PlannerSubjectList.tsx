import { View, Text, FlatList, Dimensions, ScrollView } from "react-native";
import React from "react";
import { ISubject, TDayProps, TRevisionProps } from "../../types/types";
import ChapterTopicItem from "./ChapterTopicItem";
import LottieView from "lottie-react-native";

const PlannerSubjectList = ({
  item,
  plan,
  getBackRevisionTopicsForSubject,
  getContinuousRevisionTopicsForSubject,
}: {
  item: ISubject;
  plan: TDayProps;
  getContinuousRevisionTopicsForSubject: (subject: string) => TRevisionProps[];
  getBackRevisionTopicsForSubject: (subject: string) => TRevisionProps[];
}) => {
  const mergedData = [
    ...getContinuousRevisionTopicsForSubject(item.name),
    ...getBackRevisionTopicsForSubject(item.name),
  ];

  return (
    <View
      key={item.name}
      className="h-64 border border-input-border rounded-xl p-4 mb-4"
    >
      <Text className="text-[17px] font-mada-medium capitalize text-black leading-tight mb-3">
        {item.name === "maths" ? "mathematics" : item.name}
      </Text>

      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
        }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {mergedData && mergedData.length > 0 ? (
          <>
            {mergedData.map((item) => (
              <ChapterTopicItem key={item._id} item={item} />
            ))}
          </>
        ) : (
          <View className="flex-1 items-center justify-center">
            <View className="items-center justify-center mt-3">
              <LottieView
                source={require("../../assets/no_topics_animations.json")}
                autoPlay
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            </View>
            <Text className="text-xs text-secondary-text font-mada-medium leading-tight -mt-4">
              No topics for today!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PlannerSubjectList;
