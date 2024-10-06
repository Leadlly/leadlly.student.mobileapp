import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SubjectWiseReport } from "../../types/types";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import * as Progress from "react-native-progress";
import Accordion from "./Accordion";

const TopicsCovered = ({
  subjectWiseReport,
}: {
  subjectWiseReport: SubjectWiseReport;
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["70%", "100%"], []);


  const topics = Object.entries(subjectWiseReport).map(([subject, data]) => {
    const topics = Object.keys(data.topics).join(",");
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
    <View className="shadow-lg shadow-gray-400 my-6 p-6 rounded-[12px] flex-1 bg-white">
      <Text className="text-xl font-mada-semibold mb-4 text-[#AEAEAE]">
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
            <View>
              <Text className="font-mada-medium text-sm">{item.subject}</Text>
              <Text className="font-mada-regular text-gray-600 text-xs">
                {item.details}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView contentContainerStyle={{ padding: 16 }}>
          <Text className="text-xl font-mada-semibold mb-4">
            {selectedSubject} Topics
          </Text>
          {selectedSubject &&
            Object.entries(subjectWiseReport[selectedSubject].topics).map(
              ([topic, topicData]) => (
                <Accordion
                  key={topic}
                  header={topic}
                  content={
                    <View className="p-3 bg-gray-50 rounded-lg" style={{ maxHeight: 200 }}>
                      <View className="flex-row justify-between items-center mb-3">
                        <View className="flex-row items-center">
                          <Ionicons name="help-circle-outline" size={18} color="#4A5568" />
                          <Text className="text-xs font-mada-semibold text-gray-700 ml-1">Total Questions:</Text>
                        </View>
                        <Text className="text-sm font-mada-bold text-black">{topicData.totalQuestions}</Text>
                      </View>
                      <View className="flex-row justify-between">
                        <View className="flex-1 bg-green-50 rounded p-2 mr-1">
                          <Text className="text-xs font-mada-medium text-green-700">Correct</Text>
                          <Text className="text-sm font-mada-bold text-green-600">{topicData.correct}</Text>
                        </View>
                        <View className="flex-1 bg-red-50 rounded p-2 mx-1">
                          <Text className="text-xs font-mada-medium text-red-700">Incorrect</Text>
                          <Text className="text-sm font-mada-bold text-red-600">{topicData.incorrect}</Text>
                        </View>
                        <View className="flex-1 bg-yellow-50 rounded p-2 ml-1">
                          <Text className="text-xs font-mada-medium text-yellow-700">Unattempted</Text>
                          <Text className="text-sm font-mada-bold text-yellow-600">{topicData.unattempted}</Text>
                        </View>
                      </View>
                      <View className="mt-2 bg-blue-50 rounded p-2">
                        <Text className="text-xs font-mada-medium text-blue-700">Total Marks</Text>
                        <Text className="text-sm font-mada-bold text-blue-600">{topicData.totalMarks}</Text>
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
