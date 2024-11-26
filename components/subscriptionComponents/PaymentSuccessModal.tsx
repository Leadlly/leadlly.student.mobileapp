import { View, Text, ImageBackground, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import RedirectTimer from "./RedirectTimer";
import ModalComponent from "../shared/ModalComponent";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/constants";
import { UserDataProps } from "../../types/types";
import { useGetUser } from "../../services/queries/userQuery";
import { useAppDispatch, useAppSelector } from "../../services/redux/hooks";
import { setUser } from "../../services/redux/slices/userSlice";

const PaymentSuccessModal = ({
  setIsTransactionSuccess,
  transactionSuccess,
  referenceId,
}: {
  transactionSuccess: boolean;
  setIsTransactionSuccess: (transactionSuccess: boolean) => void;
  referenceId: string | string[] | undefined;
}) => {
  const { data: userData, isLoading: loadingUserData } = useGetUser();

  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData) {
      dispatch(setUser({ ...user, ...userData.user }));
    }
  }, [userData]);

  return (
    <ModalComponent
      modalVisible={transactionSuccess}
      setModalVisible={setIsTransactionSuccess}
      isCloseIcon={false}
    >
      <View className="h-96 w-full relative items-center justify-center space-y-5">
        {loadingUserData ? (
          <ActivityIndicator size={"small"} color={colors.primary} />
        ) : (
          <>
            <View className="w-48 h-48 absolute top-0 -left-10">
              <ImageBackground
                source={require("../../assets/images/girl_celebration.png")}
                resizeMode="contain"
                style={{ flex: 1 }}
              />
            </View>
            <Feather
              name="check-circle"
              size={60}
              color={colors.leadllyGreen}
            />
            <View>
              <Text className="text-2xl font-mada-Bold leading-tight text-center">
                Payment Success
              </Text>
              <Text className="text-lg font-mada-medium leading-tight text-center">
                Congratulations! You have been upgraded.
              </Text>
            </View>
            <Text className="text-base font-mada-regular leading-tight text-center">
              Txn id: <Text className="font-mada-semibold">{referenceId}</Text>
            </Text>
            <RedirectTimer />
          </>
        )}
      </View>
    </ModalComponent>
  );
};

export default PaymentSuccessModal;
