import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TQuizAnswerProps } from "../../types/types";
import axios from "axios";
import axiosClient from "../axios/axios";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/userSlice";
import { RootState, store } from "../redux/store";

export const useSaveDailyQuiz = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const state: RootState = store.getState();
  const user = state.user.user;

  return useMutation({
    mutationFn: async (data: {
      topic: { name: string };
      questions: TQuizAnswerProps[];
    }) => {
      try {
        const res = await axiosClient.post("/api/quiz/save", data);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while saving daily quiz!!");
        }
      }
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [
          "weeklyReport",
          "monthlyReport",
          "overallReport",
          "plannerData",
        ],
      });

      const userData = await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: async () => {
          try {
            const res = await axiosClient.get("/api/auth/user");
            return res.data;
          } catch (error) {
            if (axios.isAxiosError(error)) {
              throw new Error(`${error.response?.data.message}`);
            } else {
              throw new Error("An unknown error while fetching current user!!");
            }
          }
        },
      });

      if (userData) {
        dispatch(setUser({ ...user, ...userData.user }));
      }
    },
  });
};
