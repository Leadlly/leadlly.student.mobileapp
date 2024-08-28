import { View, Text, Pressable } from "react-native";
import { progressAnalyticsMenus } from "../../constants/constants";
import clsx from "clsx";
import { useState } from "react";
import Animated from "react-native-reanimated";
import BarChart from "../charts/BarChart";
import { useAppSelector } from "../../services/redux/hooks";
import MonthlyReportChart from "../charts/MonthlyReportChart";
import OverallReportChart from "../charts/OverallReportChart";

const ProgressAnalytics = () => {
  const [activeTab, setActiveTab] = useState("weekly");

  const weeklyReport = useAppSelector((state) => state.weeklyReport.report);
  const monthlyReport = useAppSelector((state) => state.monthlyReport.report);
  const overallReport = useAppSelector((state) => state.overallReport.report);

  return (
    <View className="my-1.5 border border-input-border rounded-xl py-4 px-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-mada-Bold leading-tight">
          Progress Analytics
        </Text>

        <View className="flex-row items-center border border-input-border rounded-md p-0.5">
          {progressAnalyticsMenus.map((item) => (
            <Pressable
              key={item.id}
              className="relative w-14 h-6 items-center justify-center"
              onPress={() => setActiveTab(item.id)}>
              {activeTab === item.id && (
                <Animated.View className="bg-primary w-14 h-6 absolute inset-0 rounded" />
              )}
              <Text
                className={clsx(
                  "capitalize text-xs font-mada-semibold leading-tight",
                  activeTab === item.id && "text-white"
                )}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="flex-row justify-end space-x-5 my-5">
        <View className="flex-row items-center space-x-1.5">
          <View className="w-2.5 h-2.5 rounded-sm bg-primary" />
          <Text className="text-sm leading-none font-mada-medium">
            Revision Session
          </Text>
        </View>
        <View className="flex-row items-center space-x-1.5">
          <View className="w-2.5 h-2.5 rounded-sm bg-leadlly-cyan" />
          <Text className="text-sm leading-none font-mada-medium">Quizzes</Text>
        </View>
      </View>

      {activeTab === "weekly" && (
        <View className="flex-1">
          <BarChart weeklyProgress={weeklyReport} />
        </View>
      )}
      {activeTab === "monthly" && (
        <View className="flex-1">
          <MonthlyReportChart monthlyProgress={monthlyReport} />
        </View>
      )}
      {activeTab === "overall" && (
        <View className="flex-1">
          <OverallReportChart overallProgress={overallReport} />
        </View>
      )}
    </View>
  );
};

export default ProgressAnalytics;
