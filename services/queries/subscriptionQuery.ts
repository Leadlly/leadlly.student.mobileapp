import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import axiosClient from "../axios/axios";
import { Plan } from "../../types/types";

export const useActivateFreeTrial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axiosClient.get("/api/subscription/freetrial");
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while activating free trial!");
        }
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useGetSubscriptionPricing = (pricingType: string) => {
  return useQuery({
    queryKey: ["subscriptionPricing"],
    queryFn: async () => {
      try {
        const res: AxiosResponse = await axiosClient.get(
          `/api/subscription/pricing/get?pricingType=${pricingType}`
        );

        const responseData: { pricing: Plan[]; success: boolean } = res.data;

        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error while fetching subscription pricing!"
          );
        }
      }
    },
  });
};

export const useBuySubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planId: string) => {
      try {
        const res = await axiosClient.post(
          `/api/subscription/create?planId=${planId}`
        );

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while buying subscription!");
        }
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
