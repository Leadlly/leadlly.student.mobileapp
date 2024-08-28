import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import axiosClient from "../axios/axios";

type StudyDataProps = {
  tag: string;
  topics: Array<{ name: string }>;
  chapter: {
    name: string;
    level?: string;
  };
  subject: string;
  standard: number;
};

export const useSaveStudyData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: StudyDataProps) => {
      try {
        const res = await axiosClient.post("/api/user/progress/save", data);

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while saving study data!!");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["unrevised_topics"],
      });
    },
  });
};
