import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "expo-router";
import { useAppSelector } from "../services/redux/hooks";
import { colors } from "../constants/constants";

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
    if (!loading && !user && !isPublicPath) {
      router.replace("/welcome");
    } else if (!loading && user && !isPublicPath) {
      const hasSubmittedInitialInfo = !!user.academic.standard;

      if (!hasSubmittedInitialInfo && pathname !== "/initialInfo") {
        router.replace("/initialInfo");
      } else if (hasSubmittedInitialInfo && pathname === "/initialInfo") {
        router.replace("/dashboard");
      }
    } else if (!loading && user && !isPublicPath) {
      const category = user.category || "free";

      const trialStartDate = new Date(user.freeTrial.dateOfActivation!);
      const trialEndDate = new Date(
        trialStartDate.getTime() + 14 * 24 * 60 * 60 * 1000
      );
      const now = new Date();

      if (category === "free" && now >= trialEndDate) {
        router.replace("/subscription-plans");
      } else {
        router.replace("/dashboard");
      }
    } else if (!loading && user && isPublicPath) {
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
