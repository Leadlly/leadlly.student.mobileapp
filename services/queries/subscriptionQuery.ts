import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import axiosClient from "../axios/axios";
import { ICoupon, Plan } from "../../types/types";

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

export const useGetSubscriptionPricingByPlanId = (planId: string) => {
  return useQuery({
    queryKey: ["subscriptionPricing", planId],
    queryFn: async () => {
      try {
        const res: AxiosResponse = await axiosClient.get(
          `/api/subscription/pricing/plan/${planId}`
        );

        const responseData: { pricing: Plan; success: boolean } = res.data;
        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error while fetching subscription pricing by planId!"
          );
        }
      }
    },
    enabled: !!planId,
  });
};

export const useGetCoupon = (data: { plan: string; category: string }) => {
  return useQuery({
    queryKey: ["coupon", data.plan],
    queryFn: async () => {
      try {
        const res: AxiosResponse = await axiosClient.get(
          `/api/subscription/coupons/get?plan=${data.plan}&category=${data.category}`
        );

        const responseData: { coupons: ICoupon[]; success: boolean } = res.data;

        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching coupons!");
        }
      }
    },
  });
};

export const useCheckCustomCoupon = () => {
  return useMutation({
    mutationFn: async (data: { code: string; planId: string }) => {
      try {
        const res = await axiosClient.post(
          "/api/subscription/coupons/check",
          data
        );

        const responseData: { coupon: ICoupon; success: boolean } = res.data;

        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error occurred while checking custom coupon!"
          );
        }
      }
    },
  });
};

export const useBuySubscription = (data: {
  planId: string;
  coupon?: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axiosClient.post(
          `/api/subscription/create?planId=${data.planId}&coupon=${data.coupon}`
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
