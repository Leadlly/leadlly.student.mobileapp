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

      const trialEndDate = new Date(user.freeTrial.dateOfDeactivation!);

      const now = new Date();

      if (!hasSubmittedInitialInfo && pathname !== "/initialInfo") {
        router.replace("/initialInfo");
      } else if (
        hasSubmittedInitialInfo &&
        user.subscription.status !== "active" &&
        user.freeTrial.availed &&
        now >= trialEndDate &&
        pathname !== "/subscription-plans"
      ) {
        router.replace("/subscription-plans");
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
