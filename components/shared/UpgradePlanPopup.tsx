import { View, Text, StyleSheet } from "react-native";
import React from "react";
import UpgradeButton from "./UpgradeButton";
import { BlurView } from "expo-blur";

const UpgradePlanPopup = () => {
  return (
    <BlurView
      intensity={100}
      tint="systemUltraThinMaterialLight"
      className="absolute top-0 bottom-0 left-0 right-0 flex-1 items-center justify-center p-5 mb-16"
    >
      <View
        style={styles.upgradeBlockContainer}
        className="h-60 w-full items-center justify-center rounded-xl bg-white"
      >
        <Text className="max-w-[250px] text-center text-lg font-mada-medium leading-6 mb-4">
          Please upgrade your plan to access this feature.
        </Text>
        <UpgradeButton />
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  upgradeBlockContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default UpgradePlanPopup;
