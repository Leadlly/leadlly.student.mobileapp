import React, { useState } from "react";
import { View } from "react-native";
import { useRequestMeeting } from "../../../services/queries/meetingQuery";
import { RequestMeetingFormSchema } from "../../../schemas/requestMeetingFormSchema";
import { z } from "zod";
import RequestMeetingForm from "../../../components/MeetingComponents/RequestMeetingForm";
import SuccessMessage from "../../../components/MeetingComponents/SuccessMessage";

const RequestMeetingComponent: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync: requestMeeting, isPending: requestingMeeting } =
    useRequestMeeting();
  return (
    <View className="lg:hidden flex-1">
      {!submitted ? (
        <RequestMeetingForm
          onSuccess={() => {
            setSubmitted(true);
          }}
          requestingMeeting={requestingMeeting}
          onSubmit={(data: z.infer<typeof RequestMeetingFormSchema>) =>
            requestMeeting({
              date: data.date_of_meeting,
              time: data.time,
              message: data.meeting_agenda,
            })
          }
        />
      ) : (
        <SuccessMessage
          onBack={() => {
            setSubmitted(false);
          }}
        />
      )}
    </View>
  );
};

export default RequestMeetingComponent;
