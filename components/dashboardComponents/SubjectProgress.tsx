import { View, Text, Pressable, LayoutChangeEvent } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "../../services/redux/hooks";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { colors } from "../../constants/constants";
import clsx from "clsx";
import SemiRadialChart from "../charts/SemiRadialChart";
import TabNav from "../shared/TabNav";

const SubjectProgress = () => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  const [activeSubject, setActiveSubject] = useState(userSubjects?.[0]?.name);

  const subject = userSubjects?.filter(
    (subject) => subject?.name === activeSubject
  )[0];

  return (
    <View className="my-1.5 border border-input-border rounded-xl py-4 px-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-mada-Bold leading-tight">
          Subject Progress
        </Text>

        <TabNav
          items={userSubjects || []}
          activeItem={activeSubject!}
          setActiveItem={setActiveSubject}
          width={190}
          height={24}
          itemClassName="w-16 h-6"
        />
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
