import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axios/axios";
import axios from "axios";
import {
  ChapterTopicsProps,
  SubjectChaptersProps,
  SubTopic,
  TopicsWithSubtopicsProps,
} from "../../types/types";

export const useGetSubjectChapters = (
  subject: string | string[],
  standard: number
) => {
  return useQuery({
    queryKey: ["chapters"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get(
          `/api/questionbank/chapter?subjectName=${subject}&standard=${standard}`
        );

        const responseData: {
          chapters: SubjectChaptersProps[];
          success: boolean;
        } = res.data;

        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching chapters!!");
        }
      }
    },
  });
};

export const useGetChapterTopics = (
  subject: string | string[],
  chapterId: string | undefined,
  standard: number
) => {
  return useQuery({
    queryKey: ["topics", chapterId],
    queryFn: async () => {
      if (!chapterId) {
        throw new Error("Please select a chapter first!");
      }
      try {
        const res = await axiosClient.get(
          `/api/questionbank/topic?subjectName=${subject}&chapterId=${chapterId}&standard=${standard}`
        );

        const responseData: {
          topics: ChapterTopicsProps[];
          success: boolean;
        } = res.data;

        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching chapter topics!!");
        }
      }
    },
    enabled: !!chapterId && chapterId !== "",
  });
};

export const useGetSubTopics = (
  subject: string | string[],
  chapterName: string | undefined,
  topicName: string | undefined,
  standard: number
) => {
  return useQuery({
    queryKey: ["subtopics", topicName],
    queryFn: async () => {
      if (!chapterName && !topicName) {
        throw new Error("Please select a chapter and topic first!");
      }
      try {
        const res = await axiosClient.get(
          `/api/questionbank/subtopic?subjectName=${subject}&chapterName=${chapterName}&topicName=${topicName}`
        );

        const responseData: { subtopics: SubTopic[]; success: boolean } =
          res.data;

        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching chapter topics!!");
        }
      }
    },
    enabled:
      !!chapterName && chapterName !== "" && !!topicName && topicName !== "",
  });
};

export const useGetTopicsWithSubTopics = (
  subject: string | string[],
  chapterId: string | undefined,
  standard: number
) => {
  return useQuery({
    queryKey: ["topicsWithSubtopics", chapterId],
    queryFn: async () => {
      if (!chapterId) {
        throw new Error("Please select a chapter first!");
      }
      try {
        const res = await axiosClient.get(
          `/api/questionbank/topicwithsubtopic?subjectName=${subject}&chapterId=${chapterId}&standard=${standard}`
        );

        const responseData: {
          topics: TopicsWithSubtopicsProps[];
          success: boolean;
        } = res.data;

        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching chapter topics!!");
        }
      }
    },
    enabled: !!chapterId && chapterId !== "",
  });
};
