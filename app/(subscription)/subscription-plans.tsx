import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { colors, features, plans } from "../../constants/constants";
import { Plan } from "../../types/types";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useAppSelector } from "../../services/redux/hooks";
import { useBuySubscription } from "../../services/queries/subscriptionQuery";
import Toast from "react-native-toast-message";
import ModalComponent from "../../components/shared/ModalComponent";

const SubscriptionPlansScreen: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[1]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactionCancelled, setIsTransactionCancelled] = useState(false);

  const userToken = useAppSelector((state) => state.user.user?.token);

  const { mutateAsync: buySubscription, isPending: isBuyingSubscription } =
    useBuySubscription();

  const handleProceedButton = async () => {
    try {
      const res = await buySubscription(selectedPlan.duration);

      const redirectUrl = Linking.createURL("subscription-plans");

      const subscriptionUrl = `http://192.168.1.4:3000/subscription-plans?token=${encodeURIComponent(userToken!)}&subscriptionId=${encodeURIComponent(res.subscription.id)}&redirect=${encodeURIComponent(redirectUrl)}`;

      await WebBrowser.openBrowserAsync(subscriptionUrl);
    } catch (error: any) {
      return Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  useEffect(() => {
    const handleDeepLink = async (event: Linking.EventType) => {
      const url = Linking.parse(event.url);
      console.log(url);
      const { queryParams } = url;

      if (queryParams && queryParams.transaction === "cancelled") {
        return setIsTransactionCancelled(true);
      }
    };

    const submit = Linking.addEventListener("url", handleDeepLink);

    return () => {
      submit.remove();
    };
  }, []);

  return (
    <SafeAreaView className=" bg-white/50 pt-5 flex-1">
      <ScrollView className=" p-7 ">
        <View className="flex-row justify-center my-9">
          <Text className="text-2xl font-mada-Bold text-black">
            Our Subscription Plan
          </Text>
        </View>

        <View className="mb-6 rounded-lg bg-white px-4 py-8 shadow-2xl">
          {features.map((feature, index) => (
            <View
              key={index}
              className="flex-row justify-start items-center gap-2 mb-3"
            >
              <AntDesign
                name="checkcircle"
                size={18}
                color={colors.leadllyGreen}
              />
              <Text className="text-lg font-mada-medium text-black ">
                {feature.title}
              </Text>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            className="mt-4"
          >
            <Text className="text-primary text-center text-base">
              View details
            </Text>
          </TouchableOpacity>
        </View>

        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            className={`p-4 mb-4 rounded-xl border shadow-xl flex flex-row items-center justify-between ${
              selectedPlan.id === plan.id
                ? "border-primary bg-primary/10"
                : "border-gray-300 bg-white"
            }`}
            onPress={() => setSelectedPlan(plan)}
          >
            <View className="flex flex-row items-center gap-4">
              {selectedPlan.id === plan.id ? (
                <AntDesign
                  name="checkcircle"
                  size={20}
                  color={colors.primary}
                />
              ) : (
                <Feather name="circle" size={20} color="#B6B6B6" />
              )}
              <View>
                <Text className="text-xl font-mada-semibold text-black">
                  {plan.name}
                </Text>
                <Text className="text-gray-500 font-mada-semibold">
                  {plan.price}/- per month
                </Text>
              </View>
            </View>
            <Text
              className={` font-mada-semibold   ${
                selectedPlan.id === plan.id ? "text-primary" : "text-gray-600"
              }`}
            >
              {plan.planType}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={handleProceedButton}
          className="mt-20 p-4 bg-primary rounded-lg items-center justify-center"
        >
          {isBuyingSubscription ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <Text className="text-white text-center text-lg font-mada-Bold">
              Proceed
            </Text>
          )}
        </TouchableOpacity>

        <Modal visible={isModalVisible} animationType="slide">
          <ScrollView className="h-screen w-screen bg-white/50 p-4  ">
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="mt-4  size-5 "
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View className=" p-5 rounded-lg  flex justify-center items-center">
              <Text className="text-2xl font-mada-Bold m-7">
                Subscription Features
              </Text>
              <View
                className="bg-white p-8 rounded-2xl border border-gray-300"
                style={{
                  shadowColor: colors.primary,
                  shadowOffset: { width: 20, height: 20 },
                  shadowOpacity: 0.8,
                  shadowRadius: 60,
                  elevation: 6,
                }}
              >
                {features.map((feature, index) => (
                  <View key={index} className="mb-4">
                    <Text className="text-lg font-mada-semibold text-black pb-5">
                      {feature.title}:
                    </Text>
                    {feature.details.map((detail, i) => (
                      <Text key={i} className=" mb-3 text-base">
                        <AntDesign
                          name="check"
                          size={16}
                          color={colors.primary}
                        />
                        {"  "}
                        {detail}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>

      {transactionCancelled && (
        <ModalComponent
          modalVisible={transactionCancelled}
          setModalVisible={setIsTransactionCancelled}
          className="flex-1"
        >
          <View>
            <Text>Cancelled</Text>
          </View>
        </ModalComponent>
      )}
    </SafeAreaView>
  );
};

export default SubscriptionPlansScreen;
