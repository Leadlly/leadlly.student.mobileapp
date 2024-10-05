import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  Pressable,
  Dimensions,
} from "react-native";
import { colors, subscriptionDetails } from "../../constants/constants";
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

const SubscriptionPlansScreen: React.FC = () => {
  const { data: pricingData, isLoading: fetchingPricing } =
    useGetSubscriptionPricing("main");

  const { loading, user } = useAppSelector((state) => state.user);

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

  const defaultPaginationIndex = filteredPlans?.findIndex(plan => plan.category === "pro") ?? 0;

  const [paginationIndex, setPaginationIndex] = useState<number>(defaultPaginationIndex !== -1 ? defaultPaginationIndex : 0);

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
      console.log(url);
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

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="flex-1">
        <View
          className="relative m-5 bg-primary rounded-xl h-28 justify-center pl-6"
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

        <View className="items-center space-y-3 mt-4 mb-6">
          <Text className="text-xl font-mada-Bold leading-tight">
            Choose Your Plan
          </Text>
          <Text className="text-sm text-center leading-5 font-mada-regular max-w-sm">
            Choose the plan that suits you to Unlock exclusive benefits tailored
            to your needs!
          </Text>
        </View>

        {userCategory === "premium" ? (
          <View className="bg-yellow-100 p-4 rounded-md mx-5 mb-5">
            <Text className="text-base text-center font-mada-Bold">
              Hi! You are a premium user. Further upgrades are not present.
              If you want to extend your plan, please wait; it will be available soon. Thanks for choosing us!
            </Text>
          </View>
        ) : fetchingPricing ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size={"small"} color={colors.primary} />
          </View>
        ) : (
          <>
            <View className="max-w-[250px] w-full mx-auto flex-row items-center justify-between mb-8">
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
            </View>

            {mergedPricingData && mergedPricingData.length > 0 ? (
              <Animated.ScrollView
                ref={scrollViewRef as React.RefObject<Animated.ScrollView>}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={onScrollHandler}
                scrollEventThrottle={16}
                scrollEnabled={false}
              >
                {mergedPricingData?.map((data, index) => (
                  <SubscriptionPlanCard
                    key={data?.planId}
                    data={data}
                    index={index}
                    scrollX={scrollX}
                    paginationIndex={paginationIndex}
                    cardWidth={cardWidth}
                  />
                ))}
              </Animated.ScrollView>
            ) : null}
          </>
        )}
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
    </SafeAreaView>
  );
};

export default SubscriptionPlansScreen;
