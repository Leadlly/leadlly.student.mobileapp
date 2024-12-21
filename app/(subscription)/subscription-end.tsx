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
import React, { useState } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const SubscriptionEnd = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { mergedPricingData, fetchingPricing } = useMergePricingData();
  const user = useAppSelector((state) => state.user.user);
  const containerWidth = Dimensions.get("window").width;

  const screenBgColor = ["#FBF0FF", "#E8FBFF", "#E6FFED", "#FFFFE6", "#FFEDFC"];

  const ref = React.useRef<ICarouselInstance>(null);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = screenBgColor[currentIndex];
    return { backgroundColor };
  });

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
    <Animated.View
      style={[animatedStyle]}
      className="flex-1 items-center justify-center"
    >
      <View className="h-[550px]">
        <Carousel
          loop
          ref={ref}
          data={slides}
          renderItem={({ item }) => item}
          width={containerWidth}
          height={500}
          autoPlay={true}
          autoPlayInterval={1500}
          scrollAnimationDuration={1500}
          pagingEnabled
          onSnapToItem={(index) => {
            setCurrentIndex(index);
          }}
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
    </Animated.View>
  );
};

export default SubscriptionEnd;
