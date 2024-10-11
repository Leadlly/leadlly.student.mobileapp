import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { UserDataProps } from "../../types/types";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { AccountPersonalInfoSchema } from "../../schemas/accountPersonalInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../shared/Input";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../constants/constants";
import PersonalInfoFormDropdown from "./PersonalInfoFormDropdown";
import { capitalizeFirstLetter } from "../../helpers/utils";
import clsx from "clsx";
import { useStudentPersonalInfo } from "../../services/queries/userQuery";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "../../services/redux/hooks";
import { setUser } from "../../services/redux/slices/userSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PersonalInfoForm = ({ user }: { user: UserDataProps | null }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showScheduleDropdown, setShowScheduleDropdown] = useState(false);

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof AccountPersonalInfoSchema>>({
    resolver: zodResolver(AccountPersonalInfoSchema),
    defaultValues: {
      firstName: user?.firstname ? user.firstname : "",
      lastName: user?.lastname ? user.lastname : "",
      phone: user?.phone?.personal ? String(user.phone.personal) : "",
      email: user?.email ? user.email : "",
      parentName: user?.parent.name ? user.parent.name : "",
      parentsPhone: user?.parent.phone ? String(user.parent.phone) : "",
      address: user?.address.addressLine ? user.address.addressLine : "",
      pinCode: user?.address.pincode ? String(user.address.pincode) : "",
      schoolOrCollegeName: user?.academic.schoolOrCollegeName
        ? user.academic.schoolOrCollegeName
        : "",
      schoolOrCollegeAddress: user?.academic.schoolOrCollegeAddress
        ? user.academic.schoolOrCollegeAddress
        : "",
      coachingName: user?.academic.coachingName
        ? user.academic.coachingName
        : "",
      coachingAddress: user?.academic.coachingAddress
        ? user.academic.coachingAddress
        : "",
      coachingType: user?.academic.coachingMode
        ? user.academic.coachingMode
        : "",
      gender: user?.about.gender ? user?.about.gender : "",
      class: user?.academic.standard ? String(user?.academic.standard) : "",
      studentSchedule: user?.academic.schedule ? user.academic.schedule : "",
      country: user?.address.country ? user.address.country : "",
      dateOfBirth: user?.about.dateOfBirth ? user.about.dateOfBirth : "",
    },
  });

  const handleConfirmDateOfBirth = (date: Date) => {
    form.setValue(
      "dateOfBirth",
      date.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    );
    setShowCalendar(false);
  };

  const { mutateAsync: studentPersonalInfo, isPending: savingStudentInfo } =
    useStudentPersonalInfo();

  const onSubmit = async (data: z.infer<typeof AccountPersonalInfoSchema>) => {
    const formattedPersonalData = {
      class: data.class ? Number(data.class) : null,
      dateOfBirth: data.dateOfBirth ? data.dateOfBirth : "",
      phone: data.phone ? Number(data.phone) : null,
      parentsPhone: data.parentsPhone ? Number(data.parentsPhone) : null,
      pinCode: data.pinCode ? Number(data.pinCode) : null,
    };

    try {
      const res = await studentPersonalInfo({
        ...data,
        ...formattedPersonalData,
      });

      dispatch(setUser({ ...user, ...res.user }));

      Toast.show({
        type: "success",
        text1: res.message,
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  return (
    <View className="flex-1 mt-4">
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Basic Information */}
        <View className="space-y-3 mb-5">
          <Text className="text-lg text-primary font-mada-medium leading-none">
            Basic Information
          </Text>

          <View>
            <Controller
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <Input
                  label="First Name"
                  labelStyle="text-secondary-text"
                  icon2={
                    <AntDesign name="user" size={15} color={colors.iconGray} />
                  }
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={capitalizeFirstLetter(field.value)}
                  placeholder="Enter your firstname"
                  inputStyle="pl-3"
                  autoCapitalize="words"
                />
              )}
            />
          </View>

          <View>
            <Controller
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <Input
                  label="Last Name"
                  labelStyle="text-secondary-text"
                  icon2={
                    <AntDesign name="user" size={15} color={colors.iconGray} />
                  }
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={capitalizeFirstLetter(field.value)}
                  placeholder="Enter your lastname"
                  inputStyle="pl-3"
                  autoCapitalize="words"
                />
              )}
            />
          </View>

          <View>
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <Input
                  label="Email"
                  labelStyle="text-secondary-text"
                  icon2={
                    <FontAwesome6
                      name="envelope-open"
                      size={15}
                      color={colors.iconGray}
                    />
                  }
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  inputMode="email"
                  inputStyle="pl-3"
                  editable={false}
                />
              )}
            />
          </View>

          <View className="flex-row gap-x-3">
            <View className="flex-1">
              <Controller
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <Input
                    label="Phone No."
                    labelStyle="text-secondary-text"
                    icon2={
                      <Feather name="phone" size={15} color={colors.iconGray} />
                    }
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="Enter your phone no."
                    keyboardType="phone-pad"
                    inputMode="tel"
                  />
                )}
              />
            </View>

            <View className="flex-1">
              <Controller
                name="dateOfBirth"
                control={form.control}
                render={({ field }) => {
                  return (
                    <>
                      <Text className="text-base font-mada-medium leading-none text-secondary-text mb-1">
                        Date of Birth
                      </Text>
                      <Pressable
                        className="border border-input-border rounded-lg h-10 flex-row items-center justify-between pl-3"
                        onPress={() => setShowCalendar(true)}
                      >
                        <Text
                          className={clsx(
                            "flex-1 font-mada-regular text-left text-base capitalize",
                            !field.value && "text-tab-item-gray"
                          )}
                        >
                          {field.value ? field.value : "Select your d.o.b"}
                        </Text>
                        <View className="w-10 items-center justify-center">
                          <Feather
                            name="chevron-down"
                            size={15}
                            color={colors.iconGray}
                          />
                        </View>
                      </Pressable>

                      <DateTimePickerModal
                        isVisible={showCalendar}
                        mode="date"
                        onChange={field.onChange}
                        onConfirm={handleConfirmDateOfBirth}
                        onCancel={() => setShowCalendar(false)}
                        maximumDate={new Date(Date.now())}
                        minimumDate={new Date(1990, 0, 1)}
                      />
                    </>
                  );
                }}
              />
            </View>
          </View>

          <View className="flex-row gap-x-3">
            <View className="flex-1">
              <Controller
                name="class"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Text className="text-base font-mada-medium leading-none text-secondary-text mb-1">
                      Class
                    </Text>
                    <Pressable
                      className="border border-input-border rounded-lg h-10 flex-row items-center justify-between pl-3"
                      onPress={() => {
                        setShowClassDropdown(true);
                      }}
                    >
                      <Text
                        className={clsx(
                          "flex-1 font-mada-regular text-left text-base",
                          !field.value && "text-tab-item-gray"
                        )}
                      >
                        {field.value
                          ? field.value !== "13"
                            ? `${capitalizeFirstLetter(field.value)}th`
                            : "Dropper"
                          : "Select your country"}
                      </Text>
                      <View className="w-10 items-center justify-center">
                        <Feather
                          name="chevron-down"
                          size={15}
                          color={colors.iconGray}
                        />
                      </View>
                    </Pressable>

                    <PersonalInfoFormDropdown
                      form={form}
                      fieldName="class"
                      items={["11", "12", "13"]}
                      setShowDropdown={setShowClassDropdown}
                      showDropdown={showClassDropdown}
                    />
                  </>
                )}
              />
            </View>
            <View className="flex-1">
              <Controller
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Text className="text-base font-mada-medium leading-none text-secondary-text mb-1">
                      Gender
                    </Text>
                    <Pressable
                      className="border border-input-border rounded-lg h-10 flex-row items-center justify-between pl-3"
                      onPress={() => {
                        setShowGenderDropdown(true);
                      }}
                    >
                      <Text
                        className={clsx(
                          "flex-1 font-mada-regular text-left text-base",
                          !field.value && "text-tab-item-gray"
                        )}
                      >
                        {field.value
                          ? capitalizeFirstLetter(field.value)
                          : "Select your country"}
                      </Text>
                      <View className="w-10 items-center justify-center">
                        <Feather
                          name="chevron-down"
                          size={15}
                          color={colors.iconGray}
                        />
                      </View>
                    </Pressable>

                    <PersonalInfoFormDropdown
                      form={form}
                      fieldName="gender"
                      items={["male", "female", "other"]}
                      setShowDropdown={setShowGenderDropdown}
                      showDropdown={showGenderDropdown}
                    />
                  </>
                )}
              />
            </View>
          </View>
        </View>

        {/* Other Information */}
        <View className="space-y-3 mb-5">
          <Text className="text-lg text-primary font-mada-medium leading-none">
            Other Information
          </Text>

          <View>
            <Controller
              name="parentName"
              control={form.control}
              render={({ field }) => (
                <Input
                  label="Parent's Name (or Guardian)"
                  labelStyle="text-secondary-text"
                  icon2={
                    <AntDesign name="user" size={15} color={colors.iconGray} />
                  }
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Enter your parent's name"
                  inputStyle="pl-3"
                />
              )}
            />
          </View>

          <View>
            <Controller
              name="parentsPhone"
              control={form.control}
              render={({ field }) => (
                <Input
                  label="Parent's Phone No."
                  labelStyle="text-secondary-text"
                  icon2={
                    <Feather name="phone" size={15} color={colors.iconGray} />
                  }
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Enter your parent's phone no."
                  keyboardType="phone-pad"
                  inputMode="tel"
                />
              )}
            />
          </View>

          <View>
            <Controller
              name="address"
              control={form.control}
              render={({ field }) => (
                <Input
                  label="Address"
                  labelStyle="text-secondary-text"
                  icon2={
                    <Ionicons
                      name="globe-outline"
                      size={15}
                      color={colors.iconGray}
                    />
                  }
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Enter your address"
                  inputStyle="pl-3"
                />
              )}
            />
          </View>

          <View className="flex-row gap-x-3">
            <View className="flex-1">
              <Controller
                name="country"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Text className="text-base font-mada-medium leading-none text-secondary-text mb-1">
                      Country
                    </Text>
                    <Pressable
                      className="border border-input-border rounded-lg h-10 flex-row items-center justify-between pl-3"
                      onPress={() => {
                        setShowCountryDropdown(true);
                      }}
                    >
                      <Text
                        className={clsx(
                          "flex-1 font-mada-regular text-left text-base",
                          !field.value && "text-tab-item-gray"
                        )}
                      >
                        {field.value
                          ? capitalizeFirstLetter(field.value)
                          : "Select your country"}
                      </Text>
                      <View className="w-10 items-center justify-center">
                        <Feather
                          name="chevron-down"
                          size={15}
                          color={colors.iconGray}
                        />
                      </View>
                    </Pressable>

                    <PersonalInfoFormDropdown
                      form={form}
                      fieldName="country"
                      items={["India"]}
                      setShowDropdown={setShowCountryDropdown}
                      showDropdown={showCountryDropdown}
                    />
                  </>
                )}
              />
            </View>
            <View className="flex-1">
              <Controller
                name="pinCode"
                control={form.control}
                render={({ field }) => (
                  <Input
                    label="PIN Code"
                    labelStyle="text-secondary-text"
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    value={field.value}
                    placeholder="Enter your pincode"
                    inputStyle="px-3"
                    keyboardType="number-pad"
                  />
                )}
              />
            </View>
          </View>
        </View>

        {/* Academic Information */}
        <View className="space-y-3 mb-5">
          <Text className="text-lg text-primary font-mada-medium leading-none">
            Academic Information
          </Text>

          <View>
            <Text className="text-base text-secondary-text font-mada-medium leading-none mb-1">
              Competitive Exam
            </Text>
            <View className="flex-row items-center gap-x-2">
              <View className="w-4 h-4 rounded-full border border-primary items-center justify-center">
                <View className="w-2.5 h-2.5 rounded-full bg-primary" />
              </View>
              <Text className="text-left text-base font-mada-regular">
                {user?.academic.competitiveExam?.toUpperCase()}
              </Text>
            </View>
          </View>

          <View>
            <Controller
              name="messageAboutCompetitiveExam"
              control={form.control}
              render={({ field }) => (
                <Input
                  label="Other"
                  labelStyle="text-secondary-text"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Message about Competitive Exam"
                  inputStyle="px-3 py-2 h-24"
                  multiline={true}
                  textAlignVertical="top"
                />
              )}
            />
          </View>

          <View>
            <Controller
              name="schoolOrCollegeName"
              control={form.control}
              render={({ field }) => (
                <Input
                  label="School/College Name"
                  labelStyle="text-secondary-text"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Enter your School/College Name"
                  inputStyle="px-3"
                />
              )}
            />
          </View>

          <View>
            <Controller
              name="schoolOrCollegeAddress"
              control={form.control}
              render={({ field }) => (
                <Input
                  label="School/College Address"
                  labelStyle="text-secondary-text"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Enter your School/College Address"
                  inputStyle="px-3"
                />
              )}
            />
          </View>

          <View>
            <Controller
              name="coachingType"
              control={form.control}
              render={({ field }) => (
                <View>
                  <Text className="text-base text-secondary-text font-mada-medium leading-none mb-1">
                    Coaching
                  </Text>

                  <View className="flex-row items-center">
                    {["online", "offline"].map((item) => (
                      <Pressable
                        key={item}
                        className="flex-row items-center gap-x-2 mr-14"
                        onPress={() => field.onChange(item)}
                      >
                        <View className="w-4 h-4 rounded-full border border-primary items-center justify-center">
                          {field.value && field.value === item && (
                            <View className="w-2.5 h-2.5 rounded-full bg-primary" />
                          )}
                        </View>
                        <Text className="text-left text-base font-mada-regular">
                          {capitalizeFirstLetter(item)}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}
            />
          </View>

          <View>
            <Controller
              name="coachingName"
              control={form.control}
              render={({ field }) => (
                <Input
                  label="Coaching Name"
                  labelStyle="text-secondary-text"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Enter your Coaching Name"
                  inputStyle="px-3"
                />
              )}
            />
          </View>

          <View>
            <Controller
              name="coachingAddress"
              control={form.control}
              render={({ field }) => (
                <Input
                  label="Coaching Address"
                  labelStyle="text-secondary-text"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Enter your Coaching Address"
                  inputStyle="px-3"
                />
              )}
            />
          </View>

          <View className="flex-1">
            <Controller
              name="studentSchedule"
              control={form.control}
              render={({ field }) => (
                <>
                  <Text className="text-base font-mada-medium leading-none text-secondary-text mb-1">
                    Your Schedule
                  </Text>
                  <Pressable
                    className="border border-input-border rounded-lg h-10 flex-row items-center justify-between pl-3"
                    onPress={() => {
                      setShowScheduleDropdown(true);
                    }}
                  >
                    <Text
                      className={clsx(
                        "flex-1 font-mada-regular text-left text-base",
                        !field.value && "text-tab-item-gray"
                      )}
                    >
                      {field.value
                        ? capitalizeFirstLetter(field.value)
                        : "Select your country"}
                    </Text>
                    <View className="w-10 items-center justify-center">
                      <Feather
                        name="chevron-down"
                        size={15}
                        color={colors.iconGray}
                      />
                    </View>
                  </Pressable>

                  <PersonalInfoFormDropdown
                    form={form}
                    fieldName="studentSchedule"
                    items={[
                      "School+coaching+self-study",
                      "Coaching+self-study",
                      "School+self-study",
                      "Only self-study",
                    ]}
                    setShowDropdown={setShowScheduleDropdown}
                    showDropdown={showScheduleDropdown}
                  />
                </>
              )}
            />
          </View>

          <View>
            <Controller
              name="messageAboutStudentSchedule"
              control={form.control}
              render={({ field }) => (
                <Input
                  label="Other"
                  labelStyle="text-secondary-text"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder="Message about your Schedule"
                  inputStyle="px-3 py-2 h-24"
                  multiline={true}
                  textAlignVertical="top"
                />
              )}
            />
          </View>
        </View>
      </ScrollView>

      <View className="items-center justify-center py-2">
        <TouchableOpacity
          onPress={form.handleSubmit(onSubmit)}
          disabled={savingStudentInfo}
          className="bg-primary rounded-md w-36 h-10 items-center justify-center"
        >
          {savingStudentInfo ? (
            <ActivityIndicator size={"small"} color="#fff" />
          ) : (
            <Text className="text-white text-base font-mada-semibold">
              Save Changes
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PersonalInfoForm;
