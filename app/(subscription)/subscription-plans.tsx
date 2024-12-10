import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  colors,
  premiumPlanFeatures,
  subscriptionDetails,
} from "../../constants/constants";
import { MergedPlanData, Plan } from "../../types/types";
import * as Linking from "expo-linking";
import { useAppSelector } from "../../services/redux/hooks";
import { useGetSubscriptionPricing } from "../../services/queries/subscriptionQuery";
import PaymentSuccessModal from "../../components/subscriptionComponents/PaymentSuccessModal";
import PaymentCancelledModal from "../../components/subscriptionComponents/PaymentCancelledModal";
import { SafeAreaView } from "react-native-safe-area-context";
import clsx from "clsx";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import SubscriptionPlanCard from "../../components/subscriptionComponents/SubscriptionPlanCard";
import useGetExistingPlanRemainingAmount from "../../hooks/useGetExistingPlanRemainingAmount";
import useAppStateChange from "../../hooks/useAppStateChange";
import { Link, useLocalSearchParams } from "expo-router";
import ReloadApp from "../../components/shared/ReloadApp";
import { LinearGradient } from "expo-linear-gradient";

const SubscriptionPlansScreen: React.FC = () => {
  const currentAppState = useAppStateChange();

  const params = useLocalSearchParams<{
    isReloadingApp?: string;
  }>();

  const { data: pricingData, isLoading: fetchingPricing } =
    useGetSubscriptionPricing("main");

  const { existingRemainingAmount, fetchingExistingPlanPrice } =
    useGetExistingPlanRemainingAmount();

  const { user } = useAppSelector((state) => state.user);

  // Plan hierarchy
  const planHierarchy = ["basic", "pro", "premium"];

  // Get the user's current plan
  const userCategory = user?.category || "free"; // Assume "free" if user category is null or undefined

  // Filter the plans based on userCategory
  const filteredPlans = pricingData?.pricing.filter((plan) => {
    const planIndex = planHierarchy.indexOf(plan.category);
    const userIndex = planHierarchy.indexOf(userCategory);

    // Show plans that are hierarchically above the user's plan
    return userIndex === -1 || planIndex > userIndex;
  });

  const mergedPricingData = filteredPlans?.map((pricing) => {
    const matchingDetails = subscriptionDetails.find(
      (detail) => detail.category === pricing.category
    );

    if (matchingDetails) {
      return {
        ...pricing,
        discountPercentage: matchingDetails.discountPercentage,
        initialPrice: matchingDetails.initialPrice,
        features: matchingDetails.details,
        image: matchingDetails?.image,
      } as MergedPlanData;
    }

    return null;
  });

  const [paginationIndex, setPaginationIndex] = useState<number>(0);

  useEffect(() => {
    if (filteredPlans && filteredPlans.length > 0) {
      const defaultPaginationIndex = filteredPlans.findIndex(
        (plan) => plan.category === "pro"
      );

      setPaginationIndex(
        defaultPaginationIndex !== -1 ? defaultPaginationIndex : 0
      );
    }
  }, [filteredPlans]);

  const [transactionCancelled, setIsTransactionCancelled] = useState(false);
  const [transactionSuccess, setIsTransactionSuccess] = useState(false);
  const [transactionFailed, setIsTransactionFailed] = useState(false);
  const [referenceId, setReferenceId] = useState<string | string[] | undefined>(
    ""
  );

  const scrollX = useSharedValue(0);

  const scrollViewRef = useRef<ScrollView>(null);

  const cardWidth = Dimensions.get("screen").width;

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const scrollTo = (index: number) => {
    (scrollViewRef.current as ScrollView)?.scrollTo({
      x: index * cardWidth,
      animated: true,
    });

    setPaginationIndex(index);
  };

  useEffect(() => {
    scrollTo(paginationIndex);
  }, [paginationIndex]);

  useEffect(() => {
    const handleDeepLink = async (event: Linking.EventType) => {
      const url = Linking.parse(event.url);
      const { queryParams } = url;

      if (queryParams && queryParams.transaction === "cancelled") {
        return setIsTransactionCancelled(true);
      }

      if (queryParams && queryParams.payment === "success") {
        const referenceIdParam = queryParams.reference;
        setReferenceId(referenceIdParam);
        return setIsTransactionSuccess(true);
      }

      if (queryParams && queryParams.payment === "failed") {
        return setIsTransactionFailed(true);
      }
    };

    const submit = Linking.addEventListener("url", handleDeepLink);

    return () => {
      submit.remove();
    };
  }, []);

  if (params.isReloadingApp === "true") {
    return <ReloadApp isRedirected={params.isReloadingApp} user={user} />;
  }

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <View
          className="relative mx-5 mb-2 bg-primary rounded-xl h-28 justify-center pl-6"
          style={{ overflow: "hidden" }}
        >
          <ImageBackground
            source={require("../../assets/images/subscription_header_img.png")}
            resizeMode={"contain"}
            className="w-32 h-28 absolute -right-1 -bottom-1"
          />
          <Text className="text-lg text-white font-mada-Bold leading-6 w-40">
            Unlock Planning excellence with subscription
          </Text>
        </View>

        <View className="items-center space-y-1 mt-4 mb-6">
          <View className="flex-row items-center justify-center space-x-1">
            <Text className="text-xl text-primary font-mada-Bold leading-tight">
              Flexible
            </Text>
            <Text className="text-xl font-mada-Bold leading-tight">Plans</Text>
          </View>
          <Text className="max-w-[300px] text-base font-mada-medium text-center">
            Choose your best premium plan that works best for you
          </Text>
        </View>

        {userCategory === "premium" ? (
          <View className="bg-yellow-100 p-4 rounded-md mx-5 mb-5">
            <Text className="text-base text-center font-mada-Bold">
              Hi! You are a premium user. Further upgrades are not present. If
              you want to extend your plan, please wait; it will be available
              soon. Thanks for choosing us!
            </Text>
          </View>
        ) : fetchingPricing || fetchingExistingPlanPrice ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size={"small"} color={colors.primary} />
          </View>
        ) : (
          <View className="space-y-6 pb-4">
            {/* <View className="max-w-[250px] w-full mx-auto flex-row items-center justify-center space-x-10 mb-8">
              {filteredPlans?.map((item, index) => (
                <Pressable
                  key={item._id}
                  onPress={() => setPaginationIndex(index)}
                  className={clsx(
                    paginationIndex === index && "border-b border-primary"
                  )}
                >
                  <Text
                    className={clsx(
                      "capitalize text-base font-mada-semibold leading-tight",
                      paginationIndex === index
                        ? "text-primary"
                        : "text-tab-item-gray"
                    )}
                  >
                    {item.category}
                  </Text>
                </Pressable>
              ))}
            </View> */}

            {/* {mergedPricingData && mergedPricingData.length > 0 ? (
              <Animated.ScrollView
                ref={scrollViewRef as React.RefObject<Animated.ScrollView>}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={onScrollHandler}
                scrollEventThrottle={16}
              >
                {mergedPricingData?.map((data, index) => (
                  <SubscriptionPlanCard
                    key={data?.planId}
                    data={data}
                    index={index}
                    scrollX={scrollX}
                    paginationIndex={paginationIndex}
                    cardWidth={cardWidth}
                    user={user}
                    existingRemainingAmount={existingRemainingAmount}
                  />
                ))}
              </Animated.ScrollView>
            ) : null} */}

            {mergedPricingData && mergedPricingData.length > 0
              ? mergedPricingData.map((plan) => (
                  <View
                    key={plan?._id}
                    style={{
                      shadowColor: "#000",
                      shadowOpacity: 0.3,
                      elevation: 2.5,
                    }}
                    className={clsx(
                      "px-7 py-2 rounded-xl mx-5",
                      plan?.category === "basic"
                        ? "bg-[#FFD9AE]"
                        : plan?.category === "pro"
                          ? "bg-[#D8BDFF]"
                          : "bg-[#C8FFB6]"
                    )}
                  >
                    <View className="border-b border-tab-item-gray py-2 flex-row items-center justify-between">
                      <Text className="capitalize text-lg font-mada-Bold leading-6">
                        {plan?.category} Plan
                      </Text>
                      {plan?.category === "pro" && (
                        <LinearGradient
                          colors={[
                            "rgba(248, 155, 5, 1)",
                            "rgba(180, 56, 243, 1)",
                          ]}
                          dither={false}
                          start={{ x: 0.1, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          className="items-center justify-center py-1 px-3 rounded-full"
                        >
                          <Text className="text-[10px] font-mada-Bold leading-4 text-white">
                            Most Popular
                          </Text>
                        </LinearGradient>
                      )}
                    </View>

                    <View className="flex-row items-center space-x-1 pt-3">
                      <Text className="text-3xl leading-8 font-mada-Bold">
                        ₹{plan?.amount}
                      </Text>
                      <Text className="text-base font-mada-semibold">
                        for {plan?.["duration(months)"]} months
                      </Text>
                    </View>

                    <View className="flex-row items-center space-x-1">
                      <Text className="text-xs font-mada-regular">33% OFF</Text>
                      <View className="relative">
                        <View className="absolute top-1/2 left-0 -translate-y-0.5 -rotate-12 w-9 h-0.5 bg-leadlly-red" />
                        <Text className="text-xs font-mada-regular">
                          ₹{plan?.initialPrice}
                        </Text>
                      </View>
                    </View>

                    <Link
                      href={{
                        pathname: "/apply-coupon",
                        params: {
                          category: plan?.category,
                          planId: plan?.planId,
                          price: String(plan?.amount),
                        },
                      }}
                      asChild
                    >
                      <TouchableOpacity className="bg-black rounded-full h-10 my-2 items-center justify-center">
                        <Text className="text-white text-sm font-mada-medium">
                          Apply Coupon
                        </Text>
                      </TouchableOpacity>
                    </Link>
                  </View>
                ))
              : null}
          </View>
        )}

        <View
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.3,
            elevation: 2.5,
          }}
          className="bg-white rounded-lg px-7 py-4 mx-5 mt-3 mb-7"
        >
          <View className="items-center justify-center border-b border-tab-item-gray pb-3">
            <Text className="text-xl font-mada-semibold">
              Why join Premium?
            </Text>
          </View>

          <View className="space-y-5 mt-4 mb-2">
            {premiumPlanFeatures.map((feat) => (
              <View key={feat.id} className="flex-row items-center space-x-3">
                <Image
                  source={feat.icon}
                  resizeMode="contain"
                  className="w-7 h-7 -mt-0.5"
                />
                <Text className="text-base font-mada-regular">
                  {feat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {transactionCancelled && (
        <PaymentCancelledModal
          transactionCancelled={transactionCancelled}
          setIsTransactionCancelled={setIsTransactionCancelled}
          label={"Cancelled"}
        />
      )}

      {transactionFailed && (
        <PaymentCancelledModal
          transactionCancelled={transactionFailed}
          setIsTransactionCancelled={setIsTransactionFailed}
          label={"Failed"}
        />
      )}

      {transactionSuccess && (
        <PaymentSuccessModal
          transactionSuccess={transactionSuccess}
          setIsTransactionSuccess={setIsTransactionSuccess}
          referenceId={referenceId}
        />
      )}
    </>
  );
};

export default SubscriptionPlansScreen;
