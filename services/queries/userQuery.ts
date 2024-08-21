import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axios/axios";
import axios, { AxiosResponse } from "axios";

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      try {
        const res: AxiosResponse = await axiosClient.post(
          `/api/auth/login`,
          data
        );

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while logging in");
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

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axiosClient.get("/api/auth/logout");

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while logging out!!");
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

export const useSaveTodaysVibe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { todaysVibe: string }) => {
      try {
        const res = await axiosClient.post("/api/user/todaysVibe/save", data);

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error while saving user's today's vibe!!"
          );
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
