import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axios/axios";
import axios, { AxiosResponse } from "axios";
import { QuizReport } from "../../types/types";


export const useGetQuizReport = (quizId: string) => {
  return useQuery<QuizReport>({
    queryKey: ["quizReport", quizId],
    queryFn: async () => {
      try {
        const res: AxiosResponse<{ message: string; report: QuizReport }> = await axiosClient.get(
          `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/quiz/weekly/submission?quizId=${quizId}`,
        );
        const { report } = res.data;
        return report;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`Error in getting weekly quiz report: ${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error occurred while getting weekly quiz report!");
        }
      }
    },
  });
};
