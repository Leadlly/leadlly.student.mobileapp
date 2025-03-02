import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import CalendarModal from "./CalendarModal";
import TimeModal from "./TimeModal";
import { RequestMeetingFormSchema } from "../../schemas/requestMeetingFormSchema";
import { z } from "zod";
import { colors } from "../../constants/constants";
import { useAppSelector } from "../../services/redux/hooks";
import UpgradePlanPopup from "../shared/UpgradePlanPopup";
import LottieView from "lottie-react-native";
import VoucherIcon from "../icons/VoucherIcon";
import UpgradationComponent from "../shared/UpgradationComponent";

interface RequestMeetingFormProps {
  onSuccess: () => void;
  requestingMeeting: boolean;
  onSubmit: (data: z.infer<typeof RequestMeetingFormSchema>) => Promise<void>;
}

const RequestMeetingForm: React.FC<RequestMeetingFormProps> = ({
  onSuccess,
  requestingMeeting,
  onSubmit,
}) => {
  const [isCategory, setIsCategory] = useState(false);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);

  const userCategory = useAppSelector((state) => state.user.user?.category);

  const form = useForm<z.infer<typeof RequestMeetingFormSchema>>({
    resolver: zodResolver(RequestMeetingFormSchema),
  });

  const handleFormSubmit = async (
    data: z.infer<typeof RequestMeetingFormSchema>
  ) => {
    // if (userCategory !== "premium" && userCategory !== "free") {
    //   setIsCategory(true);
    // } else {
    try {
      await onSubmit(data);
      onSuccess();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "An error occurred",
      });
    }
    // }
  };

  // useEffect(() => {
  //   if (userCategory === "basic" || userCategory === "pro") {
  //     setIsCategory(true);
  //   }
  // }, [userCategory]);

  // if (isCategory === true) {
  //   return (
  //     <UpgradationComponent
  //       animationSource={require("../../assets/upgrade_1.json")}
  //       upgradeType="premium"
  //       tagline="Empower you growth with this premium feature"
  //       featureList={[
  //         {
  //           imageSource: require("../../assets/images/voucher.png"),
  //           feature: "Personalized one on one session",
  //         },
  //         {
  //           imageSource: require("../../assets/images/expensive-price.png"),
  //           feature: "On demand sessions",
  //         },
  //       ]}
  //     />
  //   );
  // }

  return (
    <>
      <ScrollView
        className="bg-white px-5 mb-16"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View className="flex justify-center gap-x-2 py-3 flex-row my-4 items-baseline">
          <Text className="font-mada-Bold text-2xl">Connect with Mentor</Text>
        </View>

        <Text className="text-base font-mada-medium text-center text-gray-600">
          A meeting request offers students tailored mentorship and support to
          enhance personal development.
        </Text>

        <View className="my-10">
          <View className="flex flex-row gap-5">
            <View className="mb-4 flex-1 bg-white">
              <Controller
                name="date_of_meeting"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
                    <View className="px-3 h-12 text-left font-normal border border-gray-300 rounded-lg flex-row items-center">
                      <Text className="flex-1">
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Pick a date"}
                      </Text>
                      <Feather name="calendar" size={18} color="black" />
                    </View>
                  </TouchableOpacity>
                )}
              />
              {form.formState.errors.date_of_meeting && (
                <Text className="text-red-600 font-mada-medium">
                  {form.formState.errors.date_of_meeting?.message}
                </Text>
              )}
            </View>

            <View className="mb-4 flex-1 bg-white">
              <Controller
                name="time"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TouchableOpacity onPress={() => setIsTimeModalVisible(true)}>
                    <View className="h-12 w-full border border-input-border px-3 rounded-lg flex-row items-center">
                      <View className="mr-3">
                        <MaterialIcons
                          name="access-time"
                          size={18}
                          color="#7F7F7F"
                        />
                      </View>
                      <Text className="flex-1">
                        {field.value || "Select a time"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              {form.formState.errors.time && (
                <Text className="text-red-600 font-mada-medium">
                  {form.formState.errors.time?.message}
                </Text>
              )}
            </View>
          </View>

          <View className="mb-4">
            <Controller
              name="meeting_agenda"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <View className="bg-white border border-input-border p-3 rounded-lg flex">
                  <TextInput
                    placeholder="Type your doubt here..."
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    value={field.value}
                    cursorColor={colors.primary}
                    multiline={true}
                    textAlignVertical="top"
                    numberOfLines={5}
                    className="text-lg font-mada-regular max-h-60 flex-1"
                  />
                </View>
              )}
            />
            {form.formState.errors.meeting_agenda && (
              <Text className="text-red-600 font-mada-medium">
                {form.formState.errors.meeting_agenda?.message}
              </Text>
            )}
          </View>

          <View className="text-center">
            <TouchableOpacity
              onPress={form.handleSubmit(handleFormSubmit)}
              className="bg-primary rounded-lg h-10 items-center justify-center px-4 font-mada-Bold"
            >
              {requestingMeeting ? (
                <Text className="text-white text-center font-mada-Bold">
                  Submitting...
                </Text>
              ) : (
                <Text className="text-white text-center font-mada-Bold">
                  Submit Request
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <CalendarModal
          visible={isCalendarVisible}
          onClose={() => setIsCalendarVisible(false)}
          value={form.watch("date_of_meeting")}
          onChange={(date) => form.setValue("date_of_meeting", date)}
        />

        <TimeModal
          visible={isTimeModalVisible}
          onClose={() => setIsTimeModalVisible(false)}
          value={form.watch("time")}
          onChange={(time) => form.setValue("time", time)}
        />
      </ScrollView>

      {/* {isCategory && <UpgradePlanPopup />} */}
    </>
  );
};

export default RequestMeetingForm;
