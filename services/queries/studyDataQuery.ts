import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import axiosClient from "../axios/axios";

type StudyDataProps = {
  tag: string;
  topics: Array<{ _id: string; name: string }>;
  chapter: {
    _id?: string;
    name?: string;
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

export const useStoreUnrevisedTopics = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      chapterIds: string[];
      tag: string;
      subject: string;
      standard: number;
    }) => {
      try {
        const res = await axiosClient.post(
          "/api/user/unrevisedtopics/save",
          data
        );

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while saving unrevised topics!!");
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

export const useDeleteUnrevisedTopics = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { chapterName: string }) => {
      try {
        const res = await axiosClient.delete("/api/user/topics/delete", {
          data,
        });

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while deleting unrevised topics!!");
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

export const useGetUnrevisedTopics = () => {
  return useQuery({
    queryKey: ["unrevised_topics"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get("/api/user/topics/get");
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching unrevised topics!!");
        }
      }
    },
  });
};
