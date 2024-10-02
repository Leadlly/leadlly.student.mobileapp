import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import GiftIcon from "../icons/GiftIcon";
import { ICoupon } from "../../types/types";
import { getFormattedDate } from "../../helpers/utils";
import clsx from "clsx";
import { UseFormReset } from "react-hook-form";

const CouponCard = ({
  coupon,
  index,
  setSelectedCoupon,
  selectedCoupon,
  isCustomCouponValid,
  resetCustomCouponForm,
  setIsCustomCouponValid,
}: {
  coupon: ICoupon;
  index: number;
  selectedCoupon: ICoupon | null;
  setSelectedCoupon: React.Dispatch<React.SetStateAction<ICoupon | null>>;
  isCustomCouponValid: boolean | null;
  resetCustomCouponForm: UseFormReset<{
    code: string;
  }>;
  setIsCustomCouponValid: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => {
  return (
    <View className="mx-5 overflow-hidden">
      <View className="relative h-32 bg-white rounded-xl justify-between border border-input-border px-6">
        <View
          style={{ transform: [{ translateY: -15 }] }}
          className="absolute top-1/2 -left-5 bg-white rounded-full w-8 h-8 border border-input-border"
        />
        <View
          style={{ transform: [{ translateY: -15 }] }}
          className="absolute top-1/2 -right-5 bg-white rounded-full w-8 h-8 border border-input-border"
        />

        <Image
          source={require("../../assets/images/discount_voucher.png")}
          resizeMode="contain"
          className="w-6 h-5 absolute top-0 right-20"
        />

        <Image
          source={require("../../assets/images/curved_design.png")}
          resizeMode="contain"
          className="w-80 h-full absolute top-0 left-5 -z-10"
        />

        <View className="flex-1 flex-row items-center justify-between">
          <View className="items-center justify-center pr-4">
            <View className="bg-leadlly-yellow/10 items-center justify-center rounded-full w-16 h-16">
              <GiftIcon />
            </View>
          </View>

          <View className="border-l border-dashed h-4/5" />

          <View className="flex-1 px-4 py-3 justify-between">
            <View className="flex-1">
              <Text className="text-base font-mada-semibold leading-tight">
                Get Upto
              </Text>
              <Text className="text-2xl font-mada-Bold leading-tight">
                <Text className="text-leadlly-yellow">
                  {coupon.discountValue}%
                </Text>{" "}
                OFF
              </Text>
            </View>
            <View>
              <Text className="text-xs leading-tight font-mada-medium text-secondary-text">
                Valid Until {getFormattedDate(new Date(coupon.expiryDate))}
              </Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              disabled={
                (!!selectedCoupon && selectedCoupon._id === coupon._id) ||
                isCustomCouponValid === true
              }
              onPress={() => {
                resetCustomCouponForm();
                setIsCustomCouponValid(null);
                setSelectedCoupon(coupon);
              }}
            >
              <Text
                className={clsx(
                  "text-xs font-mada-semibold text-primary",
                  (!!selectedCoupon && selectedCoupon._id === coupon._id) ||
                    (isCustomCouponValid === true && "opacity-50")
                )}
              >
                {!!selectedCoupon && selectedCoupon._id === coupon._id
                  ? "Applied"
                  : "Apply"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CouponCard;
