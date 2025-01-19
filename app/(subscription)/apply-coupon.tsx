import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Input from "../../components/shared/Input";
import { colors } from "../../constants/constants";
import { LinearGradient } from "expo-linear-gradient";
import {
  useCheckCustomCoupon,
  useGetCoupon,
} from "../../services/queries/subscriptionQuery";
import CouponCard from "../../components/subscriptionComponents/CouponCard";
import { useEffect, useState } from "react";
import { ICoupon } from "../../types/types";
import SubTotalContainer from "../../components/subscriptionComponents/SubTotalContainer";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedCallback } from "use-debounce";
import clsx from "clsx";
import useGetExistingPlanRemainingAmount from "../../hooks/useGetExistingPlanRemainingAmount";

const CustomCouponSchema = z.object({
  code: z.string().min(1, { message: "Coupon is Required" }),
});

const ApplyCoupon = () => {
  const [availableCoupons, setAvailableCoupons] = useState<ICoupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);
  const [isCustomCouponValid, setIsCustomCouponValid] = useState<
    boolean | null
  >(null);
  const [subTotalBlockHeight, setSubTotalBlockHeight] = useState(0);

  const router = useRouter();

  const { category, planId, price } = useLocalSearchParams<{
    category: string;
    planId: string;
    price: string;
  }>();

  const form = useForm<z.infer<typeof CustomCouponSchema>>({
    resolver: zodResolver(CustomCouponSchema),
  });

  const { mutateAsync: checkCustomCoupon, isPending: checkingCustomCoupon } =
    useCheckCustomCoupon();

  const validateCustomCoupon = useDebouncedCallback(async (value: string) => {
    if (value.length > 0) {
      try {
        const res = await checkCustomCoupon({ code: value, planId });

        setSelectedCoupon(res.coupon);
        setIsCustomCouponValid(true);
      } catch (error) {
        setSelectedCoupon(null);
        setIsCustomCouponValid(false);
      }
    } else {
      setSelectedCoupon(null);
      setIsCustomCouponValid(null);
    }
  }, 500);

  const { existingRemainingAmount, fetchingExistingPlanPrice } =
    useGetExistingPlanRemainingAmount();

  const isExistingRemainingAmount = !!existingRemainingAmount;

  const {
    data: listedCouponData,
    isLoading,
    isSuccess,
  } = useGetCoupon({
    plan: planId,
    category: "listed",
  });

  useEffect(() => {
    if (!listedCouponData || !isSuccess) return;

    const filteredCoupons = listedCouponData.coupons.filter(
      (coupon) => coupon.usageLimit > 0
    );

    setAvailableCoupons(filteredCoupons);
  }, [listedCouponData, isSuccess]);

  return (
    <View className="relative flex-1 bg-white">
      {isLoading || fetchingExistingPlanPrice ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"small"} color={colors.primary} />
        </View>
      ) : (
        <>
          <ScrollView
            style={{ marginBottom: subTotalBlockHeight + 5 }}
            showsVerticalScrollIndicator={false}
            className="flex-1"
          >
            {/* <TouchableOpacity
              onPress={() => router.back()}
              className="py-4 px-5"
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity> */}

            <LinearGradient
              colors={["rgba(204, 162, 255, 0.51)", "rgba(150, 84, 244, 0.72)"]}
              className="relative h-56 rounded-xl justify-between mx-5"
            >
              <View
                style={{ transform: [{ translateY: -20 }] }}
                className="absolute top-1/2 -left-6 bg-white rounded-full w-10 h-10"
              />
              <View
                style={{ transform: [{ translateY: -20 }] }}
                className="absolute top-1/2 -right-6 bg-white rounded-full w-10 h-10"
              />

              <View className="absolute top-1/2 left-0 -z-10 w-full border-b border-dashed border-tab-item-gray" />

              <View className="flex-row items-center justify-between px-8 pt-2">
                <View className="flex-1 mt-5">
                  <Text className="text-xl font-mada-Bold leading-5">
                    Get upto
                  </Text>
                  <View className="relative">
                    <Text className="text-5xl font-mada-ExtraBold text-primary/10 tracking-widest whitespace-nowrap">
                      50%
                    </Text>
                    <Text
                      style={{ transform: [{ translateY: 0 }] }}
                      className="absolute top-0  text-3xl font-mada-Bold -tracking-widest text-primary"
                    >
                      50% OFF
                    </Text>
                  </View>
                </View>

                <Image
                  source={require("../../assets/images/dayflow_gifts.png")}
                  resizeMode="contain"
                  className="w-24 h-24"
                />
              </View>

              <View className="px-8 pb-5">
                <Controller
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      label="Use coupon code :"
                      labelStyle="text-xs font-mada-semibold leading-tight text-white mb-2"
                      placeholder="Enter the Coupon"
                      placeholderTextColor={colors.inputBorder}
                      inputStyle="text-base h-12 pr-3 text-white"
                      containerStyle="px-3 border-white"
                      icon2={
                        checkingCustomCoupon ? (
                          <ActivityIndicator size={15} color={"#fff"} />
                        ) : null
                      }
                      onBlur={field.onBlur}
                      onChangeText={(value) => {
                        field.onChange(value);
                        validateCustomCoupon(value);
                      }}
                      value={field.value}
                    />
                  )}
                />

                {form.formState.errors.code && (
                  <Text className="text-[10px] text-leadlly-red font-mada-medium leading-none">
                    {form.formState.errors.code.message}
                  </Text>
                )}

                {isCustomCouponValid !== null && !checkingCustomCoupon && (
                  <Text
                    className={clsx(
                      "text-[10px] font-mada-medium leading-none -mb-3",
                      !isCustomCouponValid && "text-leadlly-red"
                    )}
                  >
                    {!isCustomCouponValid && "Invalid coupon"}
                  </Text>
                )}
              </View>
            </LinearGradient>

            <View className="items-center justify-center p-4 px-5">
              <Text className="text-xl leading-6 font-mada-semibold">
                New Offers
              </Text>
            </View>

            {availableCoupons && availableCoupons.length > 0 ? (
              <View className="flex-1 space-y-3">
                {availableCoupons.map((coupon, index) => (
                  <CouponCard
                    key={coupon._id}
                    index={index}
                    coupon={coupon}
                    selectedCoupon={selectedCoupon}
                    setSelectedCoupon={setSelectedCoupon}
                    isCustomCouponValid={isCustomCouponValid}
                    resetCustomCouponForm={form.reset}
                    setIsCustomCouponValid={setIsCustomCouponValid}
                  />
                ))}
              </View>
            ) : (
              <View className="flex-1 items-center justify-center mt-10">
                <Text className="text-lg text-center font-mada-semibold leading-tight max-w-[250px]">
                  No coupons applicable at the moment
                </Text>
                <Text className="text-base text-secondary-text font-mada-medium text-center">
                  Have a coupon code?
                </Text>
                <Text className="text-base text-secondary-text font-mada-medium text-center max-w-[250px]">
                  Try typing it in the coupon code box above
                </Text>
              </View>
            )}
          </ScrollView>

          <SubTotalContainer
            category={category}
            price={price}
            planId={planId}
            selectedCoupon={selectedCoupon}
            setSubTotalBlockHeight={setSubTotalBlockHeight}
            resetCustomCouponForm={form.reset}
            setIsCustomCouponValid={setIsCustomCouponValid}
            setSelectedCoupon={setSelectedCoupon}
            existingRemainingAmount={existingRemainingAmount}
            isExistingRemainingAmount={isExistingRemainingAmount}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
  },
});

export default ApplyCoupon;
