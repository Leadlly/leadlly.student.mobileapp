import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import { convertDateString, formatDate } from "../../../helpers/utils";
import { AntDesign } from "@expo/vector-icons";
import { useGetMeetings } from "../../../services/queries/meetingQuery";
import { colors } from "../../../constants/constants";
import { Image } from "expo-image";
import { TMeetingsProps } from "../../../types/types";

const UpcomingMeetings = () => {
  const { data, isError, isLoading, isFetching, error } = useGetMeetings("");

  const meetings = data?.meetings;

  return (
    <ScrollView className="flex-1 bg-white p-4 mb-16">
      {isError ? (
        <View className="h-[50vh] w-full items-center justify-center px-4">
          <Text className="text-sm text-gray-400 font-mada-semibold text-center">
            {error?.message}
          </Text>
        </View>
      ) : null}

      {isLoading || isFetching ? (
        <View className="h-[50vh] w-full items-center justify-center">
          <ActivityIndicator size={"small"} color={colors.primary} />
        </View>
      ) : meetings && meetings.length ? (
        meetings.map((meeting: TMeetingsProps) => (
          <View
            key={meeting._id}
            className="flex-row border-2 border-gray-200 rounded-lg p-3 my-2 bg-white shadow shadow-primary/70"
          >
            <View className="bg-primary/10 rounded-lg w-24 h-24 items-center justify-center p-2">
              <Text className="text-sm font-mada-semibold">
                {meeting.rescheduled.isRescheduled
                  ? formatDate(new Date(meeting.date))
                  : formatDate(new Date(meeting.date))}
              </Text>
              <Text className="text-xs text-gray-600 font-mada-semibold">
                {meeting.time}
              </Text>
            </View>
            <View className="flex-1 pl-3 justify-between">
              <Text numberOfLines={1} className="text-base font-mada-semibold">
                {meeting.message ? meeting.message : "New Meeting"}
              </Text>
              <View className="flex items-center gap-1 flex-row">
                <AntDesign name="clockcircleo" size={14} color="blue" />
                <Text className="text-sm text-primary">
                  {meeting.isCompleted ? "Meeting Over" : "Upcoming Meeting"}
                </Text>
              </View>

              {meeting.gmeet && meeting.gmeet.link ? (
                <TouchableOpacity
                  onPress={() => Linking.openURL(meeting.gmeet.link || "#")}
                >
                  <View className="bg-primary rounded-md py-2 px-4 mt-3">
                    <Text className="text-white text-center text-sm font-mada-semibold">
                      Join Meeting
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View className="bg-primary/60 rounded-md py-2 px-4 mt-3">
                  <Text className="text-white text-center text-sm font-mada-semibold">
                    Join Meeting
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))
      ) : (
        <View className="flex-1 items-center justify-center px-4">
          <Image
            source={require("../../../assets/images/No-meetings.png")}
            className="w-64 h-64 my-5"
          />
          <Text className="text-center text-gray-800 text-xl font-mada-semibold mb-2">
            No Meetings Scheduled
          </Text>
          <Text className="text-center text-gray-700 text-base font-mada-medium">
            You don't have any upcoming meetings at the moment.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const DoneMeetings = () => {
  const { data, isError, isLoading, isFetching, error } =
    useGetMeetings("done");

  const meetings = data?.meetings;

  return (
    <ScrollView className="flex-1 bg-white p-4 mb-16 ">
      {isError ? (
        <View className="h-[50vh] w-full items-center justify-center px-4">
          <Text className="text-sm text-gray-400 font-mada-semibold text-center">
            {error?.message}
          </Text>
        </View>
      ) : null}

      {isLoading || isFetching ? (
        <View className="h-[50vh] w-full items-center justify-center">
          <ActivityIndicator size={"small"} color={colors.primary} />
        </View>
      ) : meetings && meetings.length ? (
        meetings.map((meeting: TMeetingsProps) => (
          <View
            key={meeting._id}
            className="flex-row border-2 border-gray-200 rounded-lg p-3 my-2 bg-white shadow shadow-primary/70"
          >
            <View className="bg-primary/10 rounded-lg w-24 h-24 items-center justify-center p-2">
              <Text className="text-sm font-mada-semibold">
                {meeting.rescheduled.isRescheduled
                  ? formatDate(new Date(meeting.date))
                  : formatDate(new Date(meeting.date))}
              </Text>
              <Text className="text-xs text-gray-600 font-mada-semibold">
                {meeting.time}
              </Text>
            </View>
            <View className="flex-1 pl-3 justify-between">
              <Text numberOfLines={1} className="text-base font-mada-semibold">
                {meeting.message ? meeting.message : "Completed Meeting"}
              </Text>
              <View className="flex items-center gap-1 flex-row">
                <AntDesign name="checkcircleo" size={14} color="green" />
                <Text className="text-sm text-green-600">
                  Meeting Completed
                </Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View className="flex-1 items-center justify-center px-4">
          <Image
            source={require("../../../assets/images/No-meetings.png")}
            className="w-64 h-64 my-5"
          />
          <Text className="text-center text-gray-800 text-xl font-mada-semibold mb-2">
            No Completed Meetings
          </Text>
          <Text className="text-center text-gray-700 text-base font-mada-medium">
            You haven't completed any meetings yet.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const MeetingsComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "done">(
    "upcoming"
  );

  return (
    <View className="flex-1">
      <View className="flex-row justify-around bg-white shadow p-2">
        <TouchableOpacity
          onPress={() => setSelectedTab("upcoming")}
          className={`w-28 rounded-3xl ${
            selectedTab === "upcoming"
              ? "bg-primary/80 border border-primary"
              : "bg-transparent"
          } p-2`}
        >
          <Text
            className={`text-center font-mada-semibold ${
              selectedTab === "upcoming" ? "text-white" : "text-black"
            }`}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("done")}
          className={`w-28 rounded-3xl ${
            selectedTab === "done"
              ? "bg-primary/80 border border-primary"
              : "bg-transparent"
          } p-2`}
        >
          <Text
            className={`text-center font-mada-semibold ${
              selectedTab === "done" ? "text-white" : "text-black"
            }`}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTab === "upcoming" ? <UpcomingMeetings /> : <DoneMeetings />}
    </View>
  );
};

export default MeetingsComponent;
