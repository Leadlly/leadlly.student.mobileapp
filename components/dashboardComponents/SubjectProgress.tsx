import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../services/redux/hooks";
import Animated from "react-native-reanimated";
import { colors } from "../../constants/constants";
import clsx from "clsx";
import SemiRadialChart from "../charts/SemiRadialChart";

const SubjectProgress = () => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  const [activeSubject, setActiveSubject] = useState(userSubjects?.[0]?.name);

  const subject = userSubjects?.filter(
    (subject) => subject.name === activeSubject
  )[0];

  return (
    <View className="my-1.5 border border-input-border rounded-xl py-4 px-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-mada-Bold leading-tight">
          Subject Progress
        </Text>

        <View className="flex-row items-center border border-input-border rounded-md p-0.5">
          {userSubjects?.map((subject) => (
            <Pressable
              key={subject.name}
              className="relative w-16 h-6 items-center justify-center"
              onPress={() => setActiveSubject(subject.name)}>
              {activeSubject === subject.name && (
                <Animated.View className="bg-primary w-16 h-6 absolute inset-0 rounded" />
              )}
              <Text
                className={clsx(
                  "capitalize text-xs font-mada-semibold leading-tight",
                  activeSubject === subject.name && "text-white"
                )}>
                {subject.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="mt-5 mb-3 flex-row justify-between items-center">
        <SemiRadialChart
          data={subject?.overall_progress!}
          color={colors.primary}
          bgColor="#f6f1fd"
          legendText="Revision Session"
        />
        <SemiRadialChart
          data={subject?.overall_efficiency!}
          color={colors.leadllyCyan}
          bgColor="#f5fbfc"
          legendText="Efficiency"
        />
      </View>
    </View>
  );
};

export default SubjectProgress;
