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
          throw new Error("An unknown error while activating free trial!");
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

export const useBuySubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (duration: string) => {
      try {
        const res = await axiosClient.post(
          `/api/subscribe/create?duration=${duration}`
        );

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while buying subscription!");
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
