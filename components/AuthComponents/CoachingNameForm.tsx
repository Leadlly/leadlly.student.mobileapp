import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { FormType } from "../../types/types";
import { Controller } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/constants";
import clsx from "clsx";
import Select from "../shared/Select";
import { useGetInstituteList } from "../../services/queries/instituteQuery";
import CoachingNameField from "../shared/CoachingNameField";

// const coachingData = [
//   {
//     _id: "1",
//     name: "narayana institute",
//   },
//   {
//     _id: "2",
//     name: "agarawal institute",
//   },
//   {
//     _id: "3",
//     name: "mishra institute",
//   },
// ];

const CoachingNameForm = ({
  next,
  form,
}: {
  next: () => void;
  form: FormType;
}) => {
  const handleSkip = () => {
    form.setValue("coachingName", undefined);
    next();
  };

  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(100)}
      className="flex items-center gap-5 py-12 px-9"
    >
      <Image
        source={require("../../assets/images/teaching.jpg")}
        className="w-[25vh] h-[25vh]"
        resizeMode="contain"
      />
      <Text className="text-2xl font-mada-semibold leading-tight text-center">
        Which coaching do you attend?
      </Text>

      <View className="w-full">
        <CoachingNameField form={form} />
      </View>

      <View className="w-full items-center justify-center space-y-6">
        <TouchableOpacity
          onPress={() => next()}
          className="bg-primary rounded-lg w-16 h-9 items-center justify-center"
        >
          <Text className="text-white font-mada-medium">Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-secondary-text underline font-mada-medium">
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default CoachingNameForm;
