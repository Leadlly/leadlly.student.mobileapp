import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axios/axios";
import axios, { AxiosResponse } from "axios";
import { IInstituteProps } from "../../types/types";

export const useGetInstituteList = (query: string) => {
  return useQuery({
    queryKey: ["institutes", query],
    queryFn: async () => {
      try {
        const res: AxiosResponse<{
          institutes: IInstituteProps[];
          success: boolean;
        }> = await axiosClient.get(`/api/data/get/institutes?q=${query}`);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching institute list!!");
        }
      }
    },
  });
};
