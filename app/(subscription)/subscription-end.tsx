import { SafeAreaView } from "react-native-safe-area-context";
import Slider1 from "../../components/subscriptionComponents/SubscriptionEndSliders/Slider1";
import Slider2 from "../../components/subscriptionComponents/SubscriptionEndSliders/Slider2";
import useMergePricingData from "../../hooks/useMergePricingData";
import { useAppSelector } from "../../services/redux/hooks";
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import { colors } from "../../constants/constants";
import Slider3 from "../../components/subscriptionComponents/SubscriptionEndSliders/Slider3";
import Slider4 from "../../components/subscriptionComponents/SubscriptionEndSliders/Slider4";
import Slider5 from "../../components/subscriptionComponents/SubscriptionEndSliders/Slider5";
import React from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

const SubscriptionEnd = () => {
  const { mergedPricingData, fetchingPricing } = useMergePricingData();
  const user = useAppSelector((state) => state.user.user);
  const containerWidth = Dimensions.get("window").width;

  const ref = React.useRef<ICarouselInstance>(null);

  const slides = [
    <Slider1 width={containerWidth} />,
    <Slider2
      mergedPricingData={mergedPricingData}
      user={user}
      width={containerWidth}
    />,
    <Slider3 width={containerWidth} />,
    <Slider4
      mergedPricingData={mergedPricingData}
      user={user}
      width={containerWidth}
    />,
    <Slider5 width={containerWidth} />,
  ];

  if (fetchingPricing) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size={"small"} color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="h-[550px]">
        <Carousel
          loop
          ref={ref}
          data={slides}
          renderItem={({ item }) => item}
          width={containerWidth}
          height={500}
          autoPlay={true}
          scrollAnimationDuration={1500}
          pagingEnabled
        />
      </View>

      <View className="items-center justify-center">
        <Link href={"/subscription-plans"} asChild>
          <TouchableOpacity className="bg-primary rounded-full px-8 py-3">
            <Text className="text-base text-white font-mada-semibold">
              Upgrade Plan
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionEnd;
