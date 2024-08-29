import { TMeetingsProps } from "./../../types/types.d";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axios/axios";
import axios, { AxiosResponse } from "axios";
type DataProps = {
  date: Date;
  time: string;
  message: string;
};
export const useGetMeetings = (meeting : string) => {
  return useQuery({
    queryKey: ["meetingData",meeting],
    queryFn: async () => {
      try {
        const res: AxiosResponse = await axiosClient.post(
          `/api/meeting/get?meeting=${meeting}`
        );
        const responseData: { meetings: TMeetingsProps[] } = res.data;
        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching meeting data");
        }
      }
    },
  });
};
export const useRequestMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DataProps) => {
      try {
        const res: AxiosResponse = await axiosClient.post(
          `/api/meeting/request`,
          data
        );

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while requesting meeting");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meetingData"],
      });
    },
  });
};
