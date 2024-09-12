import { View, Text } from "react-native";
import React from "react";
import { ISubject, TDayProps } from "../../types/types";

const PlannerSubjectList = ({
  item,
  plan,
  getBackRevisionTopicsForSubject,
  getContinuousRevisionTopicsForSubject,
}: {
  item: ISubject;
  plan: TDayProps;
  getContinuousRevisionTopicsForSubject: (
    subject: string
  ) => string | undefined;
  getBackRevisionTopicsForSubject: (subject: string) => string | undefined;
}) => {
  return (
    <View key={item.name} className="px-4 py-2 justify-center">
      <Text className="text-[17px] font-mada-medium capitalize text-black leading-tight">
        {item.name}
      </Text>
      <Text
        numberOfLines={5}
        ellipsizeMode="tail"
        className="text-sm leading-tight font-mada-regular text-[#4E4E4E]"
      >
        {plan &&
        (plan?.backRevisionTopics.length > 0 ||
          plan.continuousRevisionTopics.length > 0) ? (
          <>
            {getContinuousRevisionTopicsForSubject(item.name)}
            {plan?.backRevisionTopics.length > 0 &&
            plan.continuousRevisionTopics.length > 0
              ? ", "
              : !plan.continuousRevisionTopics.length
                ? ""
                : "."}
            {getBackRevisionTopicsForSubject(item.name)}
          </>
        ) : (
          "No plans today!"
        )}
      </Text>
    </View>
  );
};

export default PlannerSubjectList;
