import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosClient from "../axios/axios";

export const useSavePushToken = () => {
  return useMutation({
    mutationFn: async (data: { pushToken: string }) => {
      try {
        const res = await axiosClient.post(
          "/api/notification/pushtoken/save",
          data
        );

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while google signing in!!");
        }
      }
    },
  });
};
