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
    pathname.startsWith("/") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/forgot-password");

  useEffect(() => {
    if (!loading && !user && !isPublicPath) {
      router.replace("/");
    } else if (!loading && user && isPublicPath) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }

  if (!user) return null;

  return children;
};

export default ProtectRoute;
