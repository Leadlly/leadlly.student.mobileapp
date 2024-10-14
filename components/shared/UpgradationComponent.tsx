import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LottieView, { AnimationObject } from "lottie-react-native";
import { useGetSubscriptionPricing } from "../../services/queries/subscriptionQuery";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { colors } from "../../constants/constants";
import { Link } from "expo-router";
import useGetExistingPlanRemainingAmount from "../../hooks/useGetExistingPlanRemainingAmount";

const UpgradationComponent = ({
  animationSource,
  featureList,
  tagline,
  upgradeType,
}: {
  animationSource: AnimationObject | string;
  upgradeType: string;
  tagline: string;
  featureList: Array<{
    imageSource: ImageSourcePropType;
    feature: string;
  }>;
}) => {
  const { data: pricingData, isLoading: fetchingPricing } =
    useGetSubscriptionPricing("main");

  const planToUpgrade = pricingData?.pricing.filter(
    (plan) => plan.category === upgradeType
  )[0];

  const { existingRemainingAmount, fetchingExistingPlanPrice } =
    useGetExistingPlanRemainingAmount();

  const extraPriceToPay =
    existingRemainingAmount && planToUpgrade
      ? planToUpgrade?.amount - existingRemainingAmount
      : planToUpgrade?.amount;

  return (
    <ScrollView className="flex-1 bg-white mb-16 pt-5">
      {fetchingPricing || fetchingExistingPlanPrice ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={25} color={colors.primary} />
        </View>
      ) : (
        <>
          <View className="items-center justify-center px-3">
            <LottieView
              source={animationSource}
              autoPlay
              style={{
                width: 210,
                height: 210,
              }}
            />
          </View>
          <Text className="text-center text-2xl font-mada-Bold px-3">
            Upgrade to {capitalizeFirstLetter(upgradeType)}
          </Text>
          <Text className="text-lg text-center font-mada-regular text-secondary-text max-w-sm mx-auto px-3">
            {tagline}
          </Text>

          <View className="max-w-xs mx-auto px-3 space-y-5 mt-8">
            {featureList.map((item, index) => (
              <View key={index} className="flex-row items-center space-x-3">
                <Image
                  source={item.imageSource}
                  resizeMode="contain"
                  className="w-8 h-8"
                />
                <Text className="text-base font-mada-medium">
                  {item.feature}
                </Text>
              </View>
            ))}
          </View>

          <View className="items-center justify-center mt-12 px-3">
            <Text className="text-base text-center font-mada-medium text-secondary-text mb-3">
              For only {Math.round(extraPriceToPay!)}/- more a year
            </Text>

            <Link
              href={{
                pathname: "/apply-coupon",
                params: {
                  category: upgradeType,
                  planId: planToUpgrade?.planId,
                  price: String(planToUpgrade?.amount),
                },
              }}
              asChild
            >
              <TouchableOpacity className="max-w-xs w-full bg-primary rounded-lg items-center flex-row justify-center space-x-4 px-2 h-11">
                <Image
                  source={require("../../assets/images/satellite-signal.png")}
                  resizeMode="contain"
                  className="w-7 h-7"
                />
                <Text className="text-base font-mada-Bold text-white">
                  Upgrade premium ₹{Math.round(extraPriceToPay!)}/-
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default UpgradationComponent;
