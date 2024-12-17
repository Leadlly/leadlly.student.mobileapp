import { useGetSubscriptionPricing } from "../services/queries/subscriptionQuery";
import { subscriptionDetails } from "../constants/constants";
import { MergedPlanData } from "../types/types";

const useMergePricingData = () => {
  const { data: pricingData, isLoading: fetchingPricing } =
    useGetSubscriptionPricing("main");

  const planHierarchy = ["momentum", "consistency", "sturdy-step"];

  const filteredPlans = pricingData?.pricing;

  const mergedPricingData = filteredPlans
    ?.map((pricing) => {
      const matchingDetails = subscriptionDetails.find(
        (detail) => detail.title === pricing.title
      );

      if (matchingDetails) {
        return {
          ...pricing,
          discountPercentage: matchingDetails.discountPercentage,
          initialPrice: matchingDetails.initialPrice,
          features: matchingDetails.details,
          image: matchingDetails?.image,
        } as MergedPlanData;
      }

      return null;
    })
    // Sort the plans based on planHierarchy
    .sort((a, b) => {
      if (!a || !b) return 0;
      const indexA = planHierarchy.indexOf(a.title);
      const indexB = planHierarchy.indexOf(b.title);
      return indexA - indexB;
    })
    // Remove any null values
    .filter(Boolean);
  return { mergedPricingData, filteredPlans, fetchingPricing };
};

export default useMergePricingData;
