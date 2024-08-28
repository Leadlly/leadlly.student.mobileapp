import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosClient from "../axios/axios";

export const useGetWeeklyReport = () => {
  return useQuery({
    queryKey: ["weeklyReport"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get("/api/user/report/week");
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching weekly report!!");
        }
      }
    },
  });
};

export const useGetMonthlyReport = () => {
  return useQuery({
    queryKey: ["monthlyReport"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get("/api/user/report/month");
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching monthly report!!");
        }
      }
    },
  });
};

export const useGetOverallReport = () => {
  return useQuery({
    queryKey: ["overallReport"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get("/api/user/report/overall");
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching overall report!!");
        }
      }
    },
  });
};
