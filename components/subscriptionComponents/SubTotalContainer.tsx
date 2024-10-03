import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useRef } from "react";
import clsx from "clsx";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ICoupon } from "../../types/types";
import { colors } from "../../constants/constants";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useBuySubscription } from "../../services/queries/subscriptionQuery";
import Toast from "react-native-toast-message";
import { useAppSelector } from "../../services/redux/hooks";
import { UseFormReset } from "react-hook-form";

const SubTotalContainer = ({
  selectedCoupon,
  setSubTotalBlockHeight,
  category,
  price,
  planId,
  resetCustomCouponForm,
  setIsCustomCouponValid,
  setSelectedCoupon,
}: {
  selectedCoupon: ICoupon | null;
  setSubTotalBlockHeight: React.Dispatch<React.SetStateAction<number>>;
  category: string;
  price: string;
  planId: string;
  resetCustomCouponForm: UseFormReset<{
    code: string;
  }>;
  setIsCustomCouponValid: React.Dispatch<React.SetStateAction<boolean | null>>;
  setSelectedCoupon: React.Dispatch<React.SetStateAction<ICoupon | null>>;
}) => {
  const subTotalBlockRef = useRef<View>(null);

  const onSubTotalBlockLayout = () => {
    if (subTotalBlockRef.current) {
      subTotalBlockRef.current.measure((x, y, width, height) => {
        setSubTotalBlockHeight(height);
      });
    }
  };

  const userToken = useAppSelector((state) => state.user.user?.token);

  const { mutateAsync: buySubscription, isPending: isBuyingSubscription } =
    useBuySubscription({ planId, coupon: selectedCoupon?.code });

  const webBaseUrl =
    process.env.EXPO_PUBLIC_WEB_APP_URL || "https://education.leadlly.in";

  const handleProceedButton = async () => {
    try {
      const res = await buySubscription();

      const redirectUrl = Linking.createURL("subscription-plans");

      const subscriptionUrl = `${webBaseUrl}/subscription-plans?token=${encodeURIComponent(userToken!)}&subscriptionId=${encodeURIComponent(res.subscription.id)}&redirect=${encodeURIComponent(redirectUrl)}`;

      await WebBrowser.openBrowserAsync(subscriptionUrl);
    } catch (error: any) {
      return Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };
  return (
    <View
      ref={subTotalBlockRef}
      onLayout={onSubTotalBlockLayout}
      className="absolute bottom-0 inset-x-0 z-30 bg-primary/10 border border-b-0 border-primary rounded-t-3xl py-5"
    >
      <View className="flex-row items-center justify-between px-5">
        {selectedCoupon && (
          <View>
            <Text className="text-xs text-secondary-text font-mada-medium">
              Added Coupon
            </Text>
            <View className="flex-row space-x-3">
              <Text className="text-secondary-text font-mada-semibold text-sm">
                {selectedCoupon.code}
              </Text>
              <View className="flex-row items-center gap-x-1">
                <Text className="text-leadlly-green text-[10px] font-mada-semibold">
                  Applied
                </Text>
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={10}
                  color={colors.leadllyGreen}
                />
              </View>
              <Pressable
                onPress={() => {
                  resetCustomCouponForm();
                  setIsCustomCouponValid(null);
                  setSelectedCoupon(null);
                }}
                className="items-center justify-center"
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={13}
                  color={colors.primary}
                />
              </Pressable>
            </View>
          </View>
        )}
        <View className="ml-auto bg-primary px-5 py-1 rounded-full">
          <Text className="text-[11px] text-white font-mada-Bold leading-tight capitalize">
            {category} plan
          </Text>
        </View>
      </View>

      <View
        className={clsx(
          "flex-row items-center justify-between mt-3 px-5",
          !selectedCoupon && "mb-3"
        )}
      >
        <Text className="text-sm font-mada-medium leading-tight text-secondary-text">
          Enrollment Fee :
        </Text>
        <Text className="text-sm font-mada-medium leading-tight">
          ₹ {price}/-
        </Text>
      </View>

      {selectedCoupon && (
        <View className="flex-row items-center justify-between my-3 px-5">
          <Text className="text-sm font-mada-medium leading-tight text-secondary-text">
            Discount {selectedCoupon.discountValue}% Off :
          </Text>
          <Text className="text-sm font-mada-medium leading-tight text-primary">
            - ₹ {(Number(price) * selectedCoupon.discountValue) / 100}/-
          </Text>
        </View>
      )}

      <View className="flex-row items-center justify-between py-4 border-t border-tab-item-gray px-5">
        <Text className="text-base font-mada-Bold leading-tight">
          Subtotal :
        </Text>

        <Text className="text-base font-mada-Bold leading-tight">
          {selectedCoupon
            ? `₹ ${Number(price) - (Number(price) * selectedCoupon.discountValue) / 100}/-`
            : `₹ ${price}/-`}
        </Text>
      </View>

      <View className="items-center justify-center h-14">
        <TouchableOpacity
          onPress={handleProceedButton}
          disabled={isBuyingSubscription}
          className={clsx(
            "w-4/5 h-11 bg-primary items-center justify-center rounded-lg",
            isBuyingSubscription && "opacity-60"
          )}
        >
          {isBuyingSubscription ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <Text className="text-white text-base font-mada-Bold">
              Proceed to Payment
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubTotalContainer;