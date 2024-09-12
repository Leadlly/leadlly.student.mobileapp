import { Image } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValid, z } from "zod";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { FormType, StudentPersonalInfoProps } from "../../types/types";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { FormSchema } from "../../schemas/formSchema";
import { useAppDispatch, useAppSelector } from "../../services/redux/hooks";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { setUser } from "../../services/redux/slices/userSlice";
import clsx from "clsx";
import { useActivateFreeTrial } from "../../services/queries/subscriptionQuery";

const ScheduleForm = ({
  next,
  form,
  saveInitialInfo,
  isSavingInitialInfo,
}: {
  next: () => void;
  form: FormType;
  saveInitialInfo: UseMutateAsyncFunction<
    any,
    Error,
    StudentPersonalInfoProps,
    unknown
  >;
  isSavingInitialInfo: boolean;
}) => {
  const { mutateAsync: activateFreeTrial, isPending: isActivatingFreeTrial } =
    useActivateFreeTrial();

  const { handleSubmit } = form;
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const saveInitialInfoResponse = await saveInitialInfo({
        phone: Number(data.phoneNumber),
        class: Number(data.class),
        competitiveExam: data.course,
        studentSchedule: data.schedule,
        gender: data.gender,
      });

      const freeTrialResponse = await activateFreeTrial();

      dispatch(setUser({ ...user, ...freeTrialResponse.user }));

      Toast.show({
        type: "success",
        text1: saveInitialInfoResponse.message,
        text2: freeTrialResponse.message,
      });

      router.replace("/dashboard?initialSetup=true");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(100)}
      className="flex items-center gap-5 py-12 px-12"
    >
      <Image
        source={require("../../assets/images/Schedule.png")}
        className="w-[20vh] h-[20vh]"
      />
      <Text className="text-2xl font-mada-semibold leading-tight text-center">
        Schedule you follow?
      </Text>
      <Text className="text-base leading-tight font-mada-medium text-center">
        Focus on core topics with hands-on practice and real-world examples for
        deeper understanding.
      </Text>

      <View className="mb-4 w-full" style={styles.input}>
        <Controller
          name="schedule"
          control={form.control}
          render={({ field }) => (
            <View className="flex  flex-col gap-4 py-4">
              {[
                "School+coaching+self-study",
                "Coaching+self-study",
                "School+self-study",
                "Only self-study",
              ].map((option) => (
                <Pressable
                  key={option}
                  className={clsx(
                    "py-2 px-4 w-full rounded-lg border-2",
                    field.value === option
                      ? "border-[#9654F4] bg-gray-50"
                      : "border-transparent bg-gray-50"
                  )}
                  onPress={() => {
                    field.onChange(option);
                  }}
                >
                  <Text
                    className={clsx(
                      "font-semibold text-base capitalize",
                      field.value === option ? "text-black" : "text-gray-500"
                    )}
                  >
                    {option.split("+").join(" + ")}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        />

        {form.formState.errors.schedule && (
          <Text className="text-red-600 font-mada-medium">
            {form.formState.errors.schedule.message}
          </Text>
        )}
      </View>

      <Pressable
        className="mt-8 py-2 px-6 bg-[#9654F4] rounded-lg flex flex-row space-x-2 justify-center items-center"
        onPress={handleSubmit(onSubmit)}
        disabled={isSavingInitialInfo || isActivatingFreeTrial}
      >
        {isSavingInitialInfo || isActivatingFreeTrial ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <>
            <Text className="text-white font-semibold">Next</Text>
            <Feather name="arrow-right" size={16} color="white" />
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default ScheduleForm;

const styles = StyleSheet.create({
  input: {
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});
