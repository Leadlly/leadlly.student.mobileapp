import { useQuery, useMutation } from "@tanstack/react-query";
import { TQuizAnswerProps } from "../../types/types";
import axiosClient from "../axios/axios";

export const useGetWeeklyQuiz = (query: string) => {
  return useQuery({
    queryKey: ["weeklyQuiz", query],
    queryFn: async () => {
      try {
        const res = await axiosClient.get(`/api/quiz/weekly/get?attempted=${query}`);
        return res.data;
      } catch (error) {
        throw new Error("An error occurred while fetching weekly quiz questions");
      }
    },
  });
};

export const useGetWeeklyQuizQuestions = (quizId: string) => {
  return useQuery({
    queryKey: ["weeklyQuizQuestions", quizId],
    queryFn: async () => {
      try {
        const res = await axiosClient.get(`/api/quiz/weekly/questions/get?quizId=${quizId}`);
        
        return res.data.data;
      } catch (error) {
        throw new Error("An error occurred while fetching weekly quiz questions");
      }
    },
  });
};

export const useSaveWeeklyQuizQuestion = () => {
  return useMutation({
    mutationFn: async (data: {
      quizId: string;
      topic: { name: string };
      question: TQuizAnswerProps;
    }) => {
      try {
        const res = await axiosClient.post('/api/quiz/weekly/questions/save', data);
        return res.data;
      } catch (error) {
        throw new Error("An error occurred while saving weekly quiz question");
      }
    },
  });
};
