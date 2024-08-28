import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axios/axios";
import axios, { AxiosResponse } from "axios";
import { DataProps } from "../../types/types";

export const useGetUserPlanner = () => {
  return useQuery({
    queryKey: ["plannerData"],
    queryFn: async () => {
      try {
        const res: AxiosResponse = await axiosClient.get("/api/planner/get");
        const responseData: DataProps = res.data;
        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching planner data");
        }
      }
    },
  });
};

export const useUpdatePlanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axiosClient.get("/api/planner/update");
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while updating planner data");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plannerData"],
      });
    },
  });
};
