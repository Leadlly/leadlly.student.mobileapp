import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import { colors, premiumPlanFeatures } from "../../constants/constants";
import * as Linking from "expo-linking";
import { useAppSelector } from "../../services/redux/hooks";
import PaymentSuccessModal from "../../components/subscriptionComponents/PaymentSuccessModal";
import PaymentCancelledModal from "../../components/subscriptionComponents/PaymentCancelledModal";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import useAppStateChange from "../../hooks/useAppStateChange";
import { useLocalSearchParams } from "expo-router";
import ReloadApp from "../../components/shared/ReloadApp";
import useMergePricingData from "../../hooks/useMergePricingData";
import RefactoredSubscriptionPlanCard from "../../components/subscriptionComponents/RefactoredSubscriptionPlanCard";

const SubscriptionPlansScreen: React.FC = () => {
  const currentAppState = useAppStateChange();

  const params = useLocalSearchParams<{
    isReloadingApp?: string;
  }>();

  const { fetchingPricing, filteredPlans, mergedPricingData } =
    useMergePricingData();

  const { user } = useAppSelector((state) => state.user);

  // Get the user's current plan
  // const userCategory = user?.category || "free"; // Assume "free" if user category is null or undefined

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

        {
          //   userCategory === "premium" ? (
          //   <View className="bg-yellow-100 p-4 rounded-md mx-5 mb-5">
          //     <Text className="text-base text-center font-mada-Bold">
          //       Hi! You are a premium user. Further upgrades are not present. If
          //       you want to extend your plan, please wait; it will be available
          //       soon. Thanks for choosing us!
          //     </Text>
          //   </View>
          // ) :
          fetchingPricing ? (
            <View className="flex-1 items-center justify-center my-5">
              <ActivityIndicator size={"small"} color={colors.primary} />
            </View>
          ) : (
            <View>
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
                    <RefactoredSubscriptionPlanCard
                      key={plan?._id}
                      plan={plan}
                    />
                  ))
                : null}
            </View>
          )
        }

        <View
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.3,
            elevation: 2.5,
          }}
          className="bg-white rounded-lg px-7 py-4 mx-5 mb-7"
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
