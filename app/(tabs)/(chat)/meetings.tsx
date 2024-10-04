import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import { convertDateString, formatDate } from "../../../helpers/utils";
import { AntDesign } from "@expo/vector-icons";
import { useGetMeetings } from "../../../services/queries/meetingQuery";
import { colors } from "../../../constants/constants";

const UpcomingMeetings = () => {
  const { data, isError, isLoading, isFetching, error } = useGetMeetings("");

  return (
    <ScrollView className="flex-1 bg-white p-4 mb-16">
      {isError ? (
        <View className="w-full h-full items-center justify-center px-4">
          <Text className="text-sm text-gray-400 font-mada-semibold text-center">
            {error.message}
          </Text>
        </View>
      ) : null}

      {isLoading || isFetching ? (
        <View className="w-full h-full items-center justify-center">
          <ActivityIndicator size={"small"} color={colors.primary} />
        </View>
      ) : data?.meetings.length ? (
        data?.meetings.map((meeting) => (
          <View
            key={meeting._id}
            className="flex-row border border-gray-200 rounded-lg p-4 my-2 bg-white shadow"
          >
            <View className="bg-primary/10 rounded-lg w-24 items-center justify-center p-2">
              <Text className="text-lg font-mada-semibold">
                {meeting.rescheduled.isRescheduled
                  ? formatDate(meeting.rescheduled.date)
                  : formatDate(new Date(meeting.date))}
              </Text>
              <Text className="text-sm text-gray-600 font-mada-semibold">
                {meeting.rescheduled.isRescheduled
                  ? meeting.rescheduled.time
                  : meeting.time}
              </Text>
            </View>
            <View className="flex-1 pl-4 justify-between">
              <Text numberOfLines={1} className="text-lg font-mada-semibold">
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
                  <View className="bg-primary rounded-md py-2 px-4 mt-4">
                    <Text className="text-white text-center font-mada-semibold">
                      Join Meeting
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View className="bg-primary/60 rounded-md py-2 px-4 mt-4">
                  <Text className="text-white text-center font-mada-semibold">
                    Join Meeting
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))
      ) : (
        <Text className="text-center text-secondary-text text-base mt-5 font-mada-Bold">
          No meetings scheduled!
        </Text>
      )}
    </ScrollView>
  );
};

const DoneMeetings = () => {
  const { data, isError, isLoading, isFetching, error } =
    useGetMeetings("done");

  return (
    <ScrollView className="flex-1 bg-white p-4 mb-16">
      {isError ? (
        <View className="w-full h-full items-center justify-center px-4">
          <Text className="text-sm text-gray-400 font-mada-semibold text-center">
            {error.message}
          </Text>
        </View>
      ) : null}

      {isLoading || isFetching ? (
        <View className="w-full h-full items-center justify-center">
          <ActivityIndicator size={"small"} color={colors.primary} />
        </View>
      ) : data?.meetings.length ? (
        data?.meetings.map((meeting) => (
          <View
            key={meeting._id}
            className="border border-gray-200 bg-white rounded-lg p-4 my-2"
          >
            <Text className="text-lg font-semibold">{meeting.message}</Text>
            <Text className="text-sm text-gray-600">
              Date:{" "}
              {meeting.rescheduled.isRescheduled
                ? convertDateString(meeting.rescheduled.date)
                : convertDateString(new Date(meeting.date))}
            </Text>
          </View>
        ))
      ) : (
        <Text className="text-center text-secondary-text text-base mt-5 font-bold">
          No meetings done yet!
        </Text>
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
      <View className="flex-row justify-around bg-white  shadow p-2">
        <TouchableOpacity
          onPress={() => setSelectedTab("upcoming")}
          className={`w-28 rounded-3xl ${
            selectedTab === "upcoming" ? "bg-primary/10" : "bg-transparent"
          } p-2`}
        >
          <Text
            className={` text-center  font-mada-semibold ${
              selectedTab === "upcoming" ? "text-primary" : "text-black"
            } `}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("done")}
          className={`w-28 rounded-3xl ${
            selectedTab === "done" ? "bg-primary/10" : "bg-transparent"
          } p-2`}
        >
          <Text
            className={` text-center  font-mada-semibold ${
              selectedTab === "done" ? " text-primary" : "text-black"
            } `}
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
