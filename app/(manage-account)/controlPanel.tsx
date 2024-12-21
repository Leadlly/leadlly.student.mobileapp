import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { colors } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../services/redux/hooks";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { ControlPanelFormSchema } from "../../schemas/controlPanelFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useStudentPersonalInfo } from "../../services/queries/userQuery";
import Toast from "react-native-toast-message";
import { setUser } from "../../services/redux/slices/userSlice";

const ControlPanel = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof ControlPanelFormSchema>>({
    resolver: zodResolver(ControlPanelFormSchema),
    defaultValues: {
      nextDay:
        user && user.preferences.continuousData.nextDay
          ? user.preferences.continuousData.nextDay
          : true,
      dailyQuestions:
        user && user.preferences.dailyQuestions
          ? user.preferences.dailyQuestions
          : 3,
      backRevisionTopics:
        user && user.preferences.backRevisionTopics
          ? user.preferences.backRevisionTopics
          : 3,
    },
  });

  useEffect(() => {
    if (user?.preferences?.continuousData?.nextDay !== undefined) {
      form.setValue("nextDay", user.preferences.continuousData.nextDay, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [user]);

  const {
    mutateAsync: studentPersonalInfo,
    isPending: savingStudentPersonalInfo,
  } = useStudentPersonalInfo();

  const handleOnSubmit = async (
    data: z.infer<typeof ControlPanelFormSchema>
  ) => {
    try {
      const res = await studentPersonalInfo(data);

      dispatch(setUser({ ...user, ...res.user }));

      Toast.show({
        type: "success",
        text1: "Preference updated successfully.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Preference update failed!",
      });
    }
  };

  return (
    <View className="bg-white flex-1">
      <ScrollView className="flex-1 bg-primary/5">
        {/* Revision Preference Controller */}
        <Controller
          name="nextDay"
          control={form.control}
          render={({ field }) => (
            <View
              style={styles.containerStyle}
              className="bg-white rounded-lg px-4 py-3 mt-5 mb-1.5 mx-3"
            >
              <Text className="text-lg leading-6 font-mada-semibold mb-3">
                Revision Preference
              </Text>
              <View className="flex-row items-center justify-between space-x-3 mb-2">
                <TouchableOpacity
                  onPress={() => field.onChange(false)}
                  style={styles.buttonStyle}
                  className={clsx(
                    "flex-1 items-center justify-center rounded-md py-2 bg-white",
                    field.value === false ? "border border-primary" : ""
                  )}
                >
                  <Text className="text-base font-mada-medium">Same Day</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => field.onChange(true)}
                  style={styles.buttonStyle}
                  className={clsx(
                    "flex-1 items-center justify-center rounded-md py-2 bg-white",
                    field.value === true ? "border border-primary" : ""
                  )}
                >
                  <Text className="text-base font-mada-medium">Next Day</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Daily Questions Controller */}
        <Controller
          name="dailyQuestions"
          control={form.control}
          render={({ field }) => (
            <View
              style={styles.containerStyle}
              className="bg-white rounded-lg px-4 py-3 mt-3 mb-1.5 mx-3"
            >
              <Text className="text-lg leading-6 font-mada-semibold mb-4">
                Number of Questions
              </Text>
              <View className="flex-row items-center gap-3 flex-wrap mb-2">
                {[3, 5, 7].map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => field.onChange(item)}
                    style={styles.buttonStyle}
                    className={clsx(
                      "items-center justify-center rounded-md py-2 bg-white flex-1 min-w-[100px]",
                      field.value === item ? "border border-primary" : ""
                    )}
                  >
                    <Text className="text-lg font-mada-semibold">{item}</Text>
                    <Text className="text-sm font-mada-medium">Questions</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        />

        {/* Back Revision Topics Controller */}
        <Controller
          name="backRevisionTopics"
          control={form.control}
          render={({ field }) => (
            <View
              style={styles.containerStyle}
              className="bg-white rounded-lg px-4 py-3 mt-3 mb-1.5 mx-3"
            >
              <Text className="text-lg leading-6 font-mada-semibold mb-4">
                Number of Back Revision Topics
              </Text>
              <View className="flex-row items-center gap-3 flex-wrap mb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => field.onChange(item)}
                    style={styles.buttonStyle}
                    className={clsx(
                      "items-center justify-center rounded-md py-2 bg-white flex-1 min-w-[50px]",
                      field.value === item ? "border border-primary" : ""
                    )}
                  >
                    <Text className="text-lg font-mada-semibold">{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        />
      </ScrollView>

      <View className="h-20 bg-primary/5 items-center justify-center">
        <TouchableOpacity
          onPress={form.handleSubmit(handleOnSubmit)}
          disabled={savingStudentPersonalInfo}
          className={clsx(
            "bg-primary h-11 w-32 rounded-lg items-center justify-center",
            savingStudentPersonalInfo && "opacity-70"
          )}
        >
          {savingStudentPersonalInfo ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <Text className="text-white text-base font-mada-semibold">
              Save
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    elevation: 5,
  },

  buttonStyle: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 3,
  },
});
export default ControlPanel;
