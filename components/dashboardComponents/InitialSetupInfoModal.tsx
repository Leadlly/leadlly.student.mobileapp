import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { BlurView } from "expo-blur";
import { Link, useRouter } from "expo-router";
import LottieView from "lottie-react-native";

const InitialSetupInfoModal = ({
  params,
}: {
  params: {
    initialSetup?: string;
  };
}) => {
  const confetti_animation = useRef<LottieView>(null);

  const router = useRouter();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={params && params.initialSetup === "true"}
      onRequestClose={() => {
        params.initialSetup === "false";
        router.replace("/dashboard");
      }}
    >
      <BlurView
        intensity={15}
        className="flex-1 items-center justify-center p-5"
      >
        <View
          className="relative bg-white rounded-xl w-72 h-72 items-center justify-center space-y-3"
          style={styles.boxShadow}
        >
          <Text className="text-[22px] leading-tight font-mada-semibold text-center">
            Hooray!!!
          </Text>

          <Text className="text-lg leading-tight font-mada-regular text-center w-40">
            You've completed your account setup.
          </Text>

          <Text className="text-lg leading-tight font-mada-regular text-center w-40">
            We will be in touch.
          </Text>

          <TouchableOpacity
            className="w-32 h-9 items-center justify-center bg-primary rounded-lg"
            onPress={() => router.replace("/dashboard")}
          >
            <Text className="text-white text-base leading-tight font-mada-semibold">
              Continue
            </Text>
          </TouchableOpacity>

          <LottieView
            ref={confetti_animation}
            source={require("../../assets/confetti.json")}
            autoPlay
            loop={false}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: -50,
            }}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default InitialSetupInfoModal;
