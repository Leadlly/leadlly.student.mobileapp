import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useGetUserPlanner } from "../../../services/queries/plannerQuery";
import { getMonthDate } from "../../../helpers/utils";
import WeeklyPlanButton from "../../../components/plannerComponents/WeeklyPlanButton";
import { useState } from "react";
import { useAppDispatch } from "../../../services/redux/hooks";
import { TDayProps } from "../../../types/types";
import { setTodaysPlan } from "../../../services/redux/slices/plannerSlice";

const Planner = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>();

  const dispatch = useAppDispatch();

  const { data, isLoading, error, isError } = useGetUserPlanner();

  const plannerData = data?.data;

  const renderItem = ({ item }: { item: TDayProps }) => {
    const borderColor = item._id === selectedPlan ? "#9654f4" : "#d9d8d8";

    return (
      <WeeklyPlanButton
        item={item}
        borderColor={borderColor}
        onPress={() => {
          setSelectedPlan(item._id);
          dispatch(setTodaysPlan(item));
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={"#9654f4"} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-300 font-mada-semibold text-base text-center">
          {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-3 mb-[64px]">
      <View className="flex-1 border border-input-border rounded-2xl py-5">
        <View className="px-5 mb-2">
          <Text className="text-2xl font-mada-semibold leading-tight">
            Weekly Plan
          </Text>
          <Text className="text-base leading-tight font-mada-semibold text-secondary-text">
            {getMonthDate(new Date(plannerData?.startDate!))} -{" "}
            {getMonthDate(new Date(plannerData?.endDate!))}
          </Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={plannerData?.days}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          extraData={selectedPlan}
          className="h-full px-5"
        />
      </View>
    </View>
  );
};

export default Planner;
