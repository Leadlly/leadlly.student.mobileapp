import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../services/redux/hooks";
import { useGetSubscriptionPricingByPlanId } from "../services/queries/subscriptionQuery";

const useGetExistingPlanRemainingAmount = () => {
  const [existingRemainingAmount, setExistingRemainingAmount] = useState<
    number | null
  >(null);

  const user = useAppSelector((state) => state.user.user);

  const { data: existingPlanPrice, isLoading: fetchingExistingPlanPrice } =
    useGetSubscriptionPricingByPlanId(user?.subscription.planId || "");

  useEffect(() => {
    if (
      existingPlanPrice &&
      existingPlanPrice.pricing &&
      user?.subscription.status === "active"
    ) {
      const existingPlan = existingPlanPrice.pricing;
      // Calculate the remaining value of the current subscription
      const currentDate = new Date();
      const deactivationDate = new Date(user?.subscription.dateOfDeactivation!);
      const timeRemaining =
        (deactivationDate.getTime() - currentDate.getTime()) /
        (1000 * 60 * 60 * 24); // Remaining days

      const pricePerDayCurrent =
        existingPlan.amount / (existingPlan["duration(months)"] * 30); // Assumes 30 days in a month
      // Remaining value of the current subscription
      const remainingValue = pricePerDayCurrent * timeRemaining;

      setExistingRemainingAmount(remainingValue);
    } else {
      setExistingRemainingAmount(0);
    }
  }, [existingPlanPrice, user, user?.subscription.dateOfDeactivation]);

  return { existingRemainingAmount, fetchingExistingPlanPrice };
};

export default useGetExistingPlanRemainingAmount;
