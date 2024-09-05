import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import axiosClient from "../axios/axios";

export const useActivateFreeTrial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axiosClient.get("/api/subscribe/freetrial");
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while signing up");
        }
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
