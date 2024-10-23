import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { Modal } from "react-native";
import { colors } from "../../constants/constants";
import { useAppDispatch } from "../../services/redux/hooks";
import { useGetUser } from "../../services/queries/userQuery";
import { setUser } from "../../services/redux/slices/userSlice";
import { UserDataProps } from "../../types/types";
import { useRouter } from "expo-router";

const ReloadApp = ({
  isRedirected,
  user,
}: {
  isRedirected: string;
  user: UserDataProps | null;
}) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { data: userInfoData, isSuccess } = useGetUser();

  useEffect(() => {
    if (isRedirected === "true" && isSuccess) {
      dispatch(setUser({ ...user, ...userInfoData.user }));
      router.setParams({ isRedirectedAfterSubscription: "false" });
    }
  }, [isRedirected, userInfoData, isSuccess]);

  return (
    <Modal
      visible={Boolean(isRedirected)}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size={18} color={colors.primary} />
      </View>
    </Modal>
  );
};

export default ReloadApp;
