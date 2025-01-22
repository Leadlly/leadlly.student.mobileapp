import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { useGetMentorInfo } from "../../services/queries/userQuery";

const MentorInfo = () => {
  const { data: mentorData, isLoading } = useGetMentorInfo();

  return (
    <View className="flex-1 flex-row items-center space-x-3">
      <View className="w-11 h-11 rounded-full border border-white bg-white">
        {isLoading ? (
          <View className="w-full h-full rounded-full bg-slate-100" />
        ) : mentorData &&
          mentorData?.mentor &&
          mentorData?.mentor?.avatar?.url ? (
          <Image
            source={{ uri: mentorData?.mentor?.avatar?.url }}
            resizeMode="contain"
            className="w-full h-full rounded-full"
          />
        ) : (
          <View className="w-full h-full rounded-full items-center justify-center">
            <Text className="text-base font-mada-semibold">
              {mentorData?.mentor?.firstname?.charAt(0)}
              {mentorData?.mentor?.lastname
                ? mentorData?.mentor?.lastname?.charAt(0)
                : ""}
            </Text>
          </View>
        )}
      </View>

      <View className="flex-1">
        {isLoading ? (
          <View className="max-w-[150px] w-full h-8 rounded-md bg-slate-100" />
        ) : (
          <>
            <Text numberOfLines={1} className="text-lg font-mada-semibold">
              {mentorData?.mentor?.firstname}{" "}
              {mentorData?.mentor?.lastname ? mentorData?.mentor?.lastname : ""}
            </Text>
            {/* <Text className="text-xs text-tab-item-gray font-mada-medium">
          Last seen today at 11:50 PM
        </Text> */}
          </>
        )}
      </View>
    </View>
  );
};

export default MentorInfo;
