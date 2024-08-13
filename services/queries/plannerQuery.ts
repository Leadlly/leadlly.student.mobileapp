import { useQuery } from "@tanstack/react-query";
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
          throw new Error(`Error while fetching planner data: ${error}`);
        } else {
          throw new Error("An unknown error while fetching planner data");
        }
      }
    },
  });
};
