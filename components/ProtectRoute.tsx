import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "expo-router";
import { useAppSelector } from "../services/redux/hooks";
import { colors, freeTrialDays } from "../constants/constants";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { user, loading } = useAppSelector((state) => state.user);

  const isPublicPath =
    pathname === "/" ||
    pathname === "/welcome" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/forgot-password");

  useEffect(() => {
    if (loading) return;

    if (!user && !isPublicPath) {
      router.replace("/welcome");
    } else if (user && !isPublicPath) {
      const hasSubmittedInitialInfo = !!user.academic.standard;

      const trialStartDate = new Date(user.freeTrial.dateOfActivation!);
      const trialEndDate = new Date(trialStartDate.getTime() + freeTrialDays);
      const now = new Date();

      if (!hasSubmittedInitialInfo && pathname !== "/initialInfo") {
        router.replace("/initialInfo");
      } else if (hasSubmittedInitialInfo && pathname === "/initialInfo") {
        router.replace("/dashboard");
      } else if (
        user.subscription.status !== "active" &&
        user.freeTrial.active &&
        now >= trialEndDate &&
        pathname !== "/subscription-plans"
      ) {
        if (pathname !== "/apply-coupon") {
          router.replace("/subscription-plans");
        }
      }
    } else if (user && isPublicPath) {
      router.replace("/dashboard");
    }
  }, [loading, pathname, user, router]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"small"} color={colors.primary} />
      </View>
    );
  }

  return children;
};

export default ProtectRoute;
