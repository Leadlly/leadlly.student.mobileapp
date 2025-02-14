import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useGetUserPlanner } from "../../../services/queries/plannerQuery";
import { getMonthDate } from "../../../helpers/utils";
import WeeklyPlanButton from "../../../components/plannerComponents/WeeklyPlanButton";
import { useState } from "react";
import { useAppDispatch } from "../../../services/redux/hooks";
import { TDayProps } from "../../../types/types";
import { setTodaysPlan } from "../../../services/redux/slices/plannerSlice";
import { colors } from "../../../constants/constants";
import NoPlannerComponent from "../../../components/plannerComponents/NoPlannerComponent";
import { useRouter } from "expo-router";

const Planner = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetUserPlanner();

  const plannerData = data?.data;

  const renderItem = ({ item }: { item: TDayProps }) => {
    const borderColor =
      item._id === selectedPlan ? colors.primary : colors.inputBorder;

    return (
      <WeeklyPlanButton
        item={item}
        borderColor={borderColor}
        onPress={() => {
          setSelectedPlan(item._id);
          dispatch(setTodaysPlan(item));
          router.push("/active");
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center mb-16">
        <ActivityIndicator size={"small"} color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return <NoPlannerComponent />;
  }

  return (
    <View className="flex-1 bg-white p-3 mb-16">
      <View className="flex-1 border border-input-border rounded-2xl py-5">
        <View className="px-5 mb-2">
          <Text className="text-2xl font-mada-semibold leading-tight">
            Weekly Plan
          </Text>
          <Text className="text-base leading-tight font-mada-semibold text-secondary-text">
            {plannerData && plannerData.startDate && plannerData.endDate ? (
              <>
                {getMonthDate(new Date(plannerData?.startDate!))} -{" "}
                {getMonthDate(new Date(plannerData?.endDate!))}
              </>
            ) : null}
          </Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={
            plannerData && plannerData?.days.length > 0 ? plannerData.days : []
          }
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          extraData={selectedPlan}
          ListEmptyComponent={
            <View className="w-full my-10">
              <Text className="text-center font-mada-semibold text-lg leading-tight text-tab-item-gray">
                No Planner Yet!
              </Text>
            </View>
          }
          className="h-full px-5"
        />
      </View>
    </View>
  );
};

export default Planner;
