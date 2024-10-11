import { View, Text, ActivityIndicator, FlatList, Image } from "react-native";
import { useGetUserPlanner } from "../../../services/queries/plannerQuery";
import { useAppDispatch, useAppSelector } from "../../../services/redux/hooks";
import { useEffect } from "react";
import { setTodaysPlan } from "../../../services/redux/slices/plannerSlice";
import {
  capitalizeFirstLetter,
  getFormattedDate,
  getTodaysDay,
  getTodaysFormattedDate,
} from "../../../helpers/utils";
import PlannerSubjectList from "../../../components/plannerComponents/PlannerSubjectList";
import { colors } from "../../../constants/constants";
import InitialTodoBox from "../../../components/dashboardComponents/InitialTodoBox";
import LottieView from "lottie-react-native";
import NoPlannerComponent from "../../../components/plannerComponents/NoPlannerComponent";
import { TRevisionProps } from "../../../types/types";

const ActivePlannerPage = () => {
  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useGetUserPlanner();

  const dispatch = useAppDispatch();

  const { loading, plan } = useAppSelector((state) => state.todaysPlan);

  const user = useAppSelector((state) => state.user.user);

  const userSubjects = user?.academic.subjects;

  function getBackRevisionTopicsForSubject(subject: string): TRevisionProps[] {
    const topics =
      plan?.backRevisionTopics.filter(
        (topic) => topic.subject.name === subject
      ) ?? [];

    return topics?.length || (plan?.continuousRevisionTopics.length ?? 0) > 0
      ? topics
      : [];
  }

  function getContinuousRevisionTopicsForSubject(
    subject: string
  ): TRevisionProps[] {
    const topics =
      plan?.continuousRevisionTopics.filter(
        (topic) => topic.subject.name === subject
      ) ?? [];

    return topics?.length || (plan?.backRevisionTopics.length ?? 0) > 0
      ? topics
      : [];
  }

  useEffect(() => {
    if (data && data.data && data.data.days.length > 0 && isSuccess) {
      dispatch(
        setTodaysPlan(
          data.data.days.filter(
            (day) =>
              getFormattedDate(new Date(day.date)) ===
              getFormattedDate(new Date(Date.now()))
          )[0]
        )
      );
    }
  }, [dispatch, isSuccess, data]);

  if (user && user.planner === false) {
    return (
      <View className="p-3 bg-white flex-1">
        <InitialTodoBox />
      </View>
    );
  }

  if (isError) {
    return <NoPlannerComponent />;
  }

  if (isLoading || isFetching || loading) {
    return (
      <View className="flex-1 bg-white items-center justify-center mb-16">
        <ActivityIndicator size={"small"} color={colors.primary} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-3 mb-16">
      <View className="pb-16">
        <View className="h-16 bg-primary/10 px-4 rounded-lg justify-center mb-3">
          <Text className="text-lg font-mada-semibold leading-tight">
            {!plan?.day && plan?.day !== getTodaysDay()
              ? "Today"
              : plan?.day && plan.day === getTodaysDay()
                ? "Today"
                : plan.day}
            &apos;s Plan
          </Text>
          <Text className="text-sm leading-tight font-mada-semibold text-[#888]">
            {plan?.day ? plan.day : getTodaysDay()}{" "}
            {plan?.date
              ? getFormattedDate(new Date(plan?.date!))
              : getTodaysFormattedDate()}
          </Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={userSubjects}
          keyExtractor={(item) => item.name}
          renderItem={(item) => (
            <PlannerSubjectList
              item={item.item}
              getBackRevisionTopicsForSubject={getBackRevisionTopicsForSubject}
              getContinuousRevisionTopicsForSubject={
                getContinuousRevisionTopicsForSubject
              }
            />
          )}
        />
      </View>
    </View>
  );
};

export default ActivePlannerPage;
