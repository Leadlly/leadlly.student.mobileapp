import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SubjectWiseReport } from "../../types/types";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Accordion from "./Accordion";
import { colors } from "../../constants/constants";

const TopicsCovered = ({
  subjectWiseReport,
}: {
  subjectWiseReport: SubjectWiseReport;
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["70%", "100%"], []);

  const topics = Object.entries(subjectWiseReport).map(([subject, data]) => {
    const topics = Object.keys(data.topics).join(", ");
    return {
      id: subject,
      subject: subject,
      details: topics,
    };
  });

  const handlePresentModalPress = useCallback((subject: string) => {
    setSelectedSubject(subject);
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <View className="shadow-lg shadow-gray-400 my-6 p-5 rounded-[12px] flex-1 bg-white">
      <Text className="text-xl font-mada-semibold mb-4 text-secondary-text">
        Topics Covered
      </Text>
      <ScrollView
        className="max-h-52"
        keyboardShouldPersistTaps="always"
        scrollEnabled={true}
        nestedScrollEnabled={true}
      >
        {topics.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handlePresentModalPress(item.subject)}
            className="border border-opacity-20 border-black/10 rounded-lg p-2 flex-row justify-between items-center mb-3"
          >
            <View className="flex-1">
              <Text className="font-mada-medium text-sm capitalize">
                {item.subject}
              </Text>
              <Text className="font-mada-regular text-tab-item-gray text-xs capitalize">
                {item.details}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.iconGray}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        style={{ paddingVertical: 30 }}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 10,
          }}
        >
          <Text className="text-xl font-mada-semibold capitalize">
            {selectedSubject} Topics
          </Text>
          {selectedSubject &&
            Object.entries(subjectWiseReport[selectedSubject].topics).map(
              ([topic, topicData]) => (
                <Accordion
                  key={topic}
                  header={topic}
                  content={
                    <View
                      className="p-3 bg-primary/5 rounded-lg"
                      style={{ maxHeight: 200 }}
                    >
                      <View className="flex-row justify-between items-center mb-3">
                        <View className="flex-row items-center">
                          <Ionicons
                            name="help-circle-outline"
                            size={18}
                            color={colors.iconGray}
                          />
                          <Text className="text-xs font-mada-semibold text-secondary-text ml-1">
                            Total Questions:
                          </Text>
                        </View>
                        <Text className="text-sm font-mada-Bold text-black">
                          {topicData.totalQuestions}
                        </Text>
                      </View>
                      <View className="flex-row justify-between">
                        <View className="flex-1 bg-leadlly-green/10 rounded p-2 mr-1">
                          <Text className="text-xs font-mada-medium text-leadlly-green">
                            Correct
                          </Text>
                          <Text className="text-sm font-mada-bold text-leadlly-green">
                            {topicData.correct}
                          </Text>
                        </View>
                        <View className="flex-1 bg-leadlly-red/10 rounded p-2 mx-1">
                          <Text className="text-xs font-mada-medium text-leadlly-red">
                            Incorrect
                          </Text>
                          <Text className="text-sm font-mada-bold text-leadlly-red">
                            {topicData.incorrect}
                          </Text>
                        </View>
                        <View className="flex-1 bg-leadlly-yellow/10 rounded p-2 ml-1">
                          <Text className="text-xs font-mada-medium text-leadlly-yellow">
                            Unattempted
                          </Text>
                          <Text className="text-sm font-mada-bold text-leadlly-yellow">
                            {topicData.unattempted}
                          </Text>
                        </View>
                      </View>
                      <View className="mt-2 bg-blue-50 rounded p-2">
                        <Text className="text-xs font-mada-medium text-blue-700">
                          Total Marks
                        </Text>
                        <Text className="text-sm font-mada-bold text-blue-600">
                          {topicData.totalMarks}
                        </Text>
                      </View>
                    </View>
                  }
                  efficiency={topicData.efficiency}
                />
              )
            )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};

export default TopicsCovered;
