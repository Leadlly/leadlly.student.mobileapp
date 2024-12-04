import { View, Text, ScrollView } from "react-native";
import React from "react";
import {
  ISubject,
  TChapterRevisionProps,
  TRevisionProps,
} from "../../types/types";
import ChapterTopicItem from "./ChapterTopicItem";
import LottieView from "lottie-react-native";

const PlannerSubjectList = ({
  item,
  getBackRevisionTopicsForSubject,
  getContinuousRevisionTopicsForSubject,
  getContinuousRevisionSubTopicsForSubject,
  getChapterRevisionForSubject,
}: {
  item: ISubject;
  getContinuousRevisionTopicsForSubject: (subject: string) => TRevisionProps[];
  getBackRevisionTopicsForSubject: (subject: string) => TRevisionProps[];
  getContinuousRevisionSubTopicsForSubject(subject: string): TRevisionProps[];
  getChapterRevisionForSubject(subject: string): TChapterRevisionProps[];
}) => {
  const mergedData = [
    ...getContinuousRevisionTopicsForSubject(item.name),
    ...getBackRevisionTopicsForSubject(item.name),
  ];

  const mergedSubtopics = [
    ...getContinuousRevisionSubTopicsForSubject(item.name),
  ];

  const mergedChapters = [...getChapterRevisionForSubject(item.name)];

  return (
    <View
      key={item.name}
      className="max-h-72 border border-input-border rounded-xl p-4 mb-4"
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
        {(mergedData && mergedData.length > 0) ||
        (mergedSubtopics && mergedSubtopics.length > 0) ||
        (mergedChapters && mergedChapters.length > 0) ? (
          <>
            {mergedChapters.map((item) => (
              <ChapterTopicItem key={item.id} item2={item} isChapter={true} />
            ))}
            {mergedData.map((item) => (
              <ChapterTopicItem key={item._id} item={item} />
            ))}
            {mergedSubtopics.map((item) => (
              <ChapterTopicItem key={item._id} item={item} isSubtopics={true} />
            ))}
          </>
        ) : (
          <View className="flex-1 items-center justify-center">
            <View className="items-center justify-center">
              <LottieView
                source={require("../../assets/no_topics_animations.json")}
                autoPlay
                style={{
                  width: 100,
                  height: 100,
                  marginTop: -20,
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
