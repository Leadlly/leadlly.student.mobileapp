import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axios/axios";
import axios, { AxiosResponse } from "axios";
import { TTrackerProps } from "../../types/types";

export const useGetUserTracker = (subject: string) => {
  return useQuery({
    queryKey: ["tracker"],
    queryFn: async () => {
      try {
        const res: AxiosResponse = await axiosClient.get(
          `/api/tracker/get?subject=${subject}`
        );

        const responseData: { success: boolean; tracker: TTrackerProps[] } =
          res.data;

        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`Error while fetching tracker data: ${error}`);
        } else {
          throw new Error("An unknown error while fetching tracker data");
        }
      }
    },
  });
};
