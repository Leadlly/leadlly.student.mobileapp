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

const ActivePlannerPage = () => {
  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useGetUserPlanner();

  const dispatch = useAppDispatch();

  const { loading, plan } = useAppSelector((state) => state.todaysPlan);

  const user = useAppSelector((state) => state.user.user);

  const userSubjects = user?.academic.subjects;

  function getBackRevisionTopicsForSubject(subject: string) {
    const topics = plan?.backRevisionTopics
      .filter((topic) => topic.subject.name === subject)
      .map((topic) => capitalizeFirstLetter(topic.topic.name));

    return !topics?.length && !plan?.continuousRevisionTopics.length
      ? "No plans today!"
      : topics?.join(", ");
  }

  function getContinuousRevisionTopicsForSubject(subject: string) {
    const topics = plan?.continuousRevisionTopics
      .filter((topic) => topic.subject.name === subject)
      .map((topic) => capitalizeFirstLetter(topic.topic.name));

    return !topics?.length && !plan?.backRevisionTopics.length
      ? "No plans today!"
      : topics?.join(", ");
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

  return (
    <View className="flex-1 bg-white p-3">
      <View className="border border-[#d8d5d5] rounded-2xl max-h-[400px] mb-4">
        {isError ? (
          <View className="w-full h-full items-center justify-center px-4">
            <Text className="text-sm text-gray-400 font-mada-semibold text-center">
              {error.message}
            </Text>
          </View>
        ) : null}

        {isLoading || isFetching || loading ? (
          <View className="w-full h-full items-center justify-center">
            <ActivityIndicator size={"small"} color={colors.primary} />
          </View>
        ) : (
          <>
            <View className="h-16 bg-primary/5 px-4 justify-center">
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
                  plan={plan!}
                  getBackRevisionTopicsForSubject={
                    getBackRevisionTopicsForSubject
                  }
                  getContinuousRevisionTopicsForSubject={
                    getContinuousRevisionTopicsForSubject
                  }
                />
              )}
              ItemSeparatorComponent={() => (
                <View className=" border-b border-input-border" />
              )}
            />
          </>
        )}
      </View>

      <View className="items-center justify-center mt-8">
        <Image
          source={require("../../../assets/images/revision_zone.png")}
          resizeMode="contain"
          className="w-48 h-48"
        />
      </View>
    </View>
  );
};

export default ActivePlannerPage;
