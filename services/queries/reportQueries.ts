import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axios/axios";
import axios, { AxiosResponse } from "axios";
import { QuizReport } from "../../types/types";

export const useGenerateQuizReport = (quizId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const res: AxiosResponse<{ message: string; report: QuizReport }> =
          await axiosClient.get(`/api/quiz/submission?quizId=${quizId}`);
        const responseData = res.data;
        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error occurred while generating weekly quiz report!"
          );
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["quizReport", quizId],
      });
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ["weeklyQuiz", "unattempted"] }),
        queryClient.refetchQueries({ queryKey: ["weeklyQuiz", "attempted"] }),
      ]);
    },
  });
};

export const useGetQuizReport = (quizId: string) => {
  return useQuery<QuizReport>({
    queryKey: ["quizReport", quizId],
    queryFn: async () => {
      try {
        const res: AxiosResponse<{ message: string; report: QuizReport }> =
          await axiosClient.get(`/api/quiz/report?quizId=${quizId}`);
        const { report } = res.data;
        return report;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            `Error in getting weekly quiz report: ${error.response?.data.message}`
          );
        } else {
          throw new Error(
            "An unknown error occurred while getting weekly quiz report!"
          );
        }
      }
    },
  });
};
