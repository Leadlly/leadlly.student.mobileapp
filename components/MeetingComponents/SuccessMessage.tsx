import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { colors } from "../../constants/constants";

interface SuccessMessageProps {
  onBack: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onBack }) => {
  return (
    <View className="relative py-20 bg-white mb-16">
      <Image
        source={require("../../assets/images/girl_celebration.png")}
        className="h-[20vh] w-[13vh] opacity-70 mx-5"
      />

      <View className="absolute top-2 right-2">
        <TouchableOpacity
          onPress={onBack}
          className="border-primary text-primary flex flex-row items-center py-2 px-4 gap-2"
        >
          <Ionicons name="arrow-back" size={20} color={colors.primary} />
          <Text className="text-primary text-center font-mada-semibold">
            Back
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-col gap-y-7 items-center justify-center text-center">
        <View style={styles.shadowPrimary}>
          <AntDesign name="check" size={24} color="white" />
        </View>
        <Text className="text-primary text-4xl font-mada-Bold">
          Sent Successfully
        </Text>
        <View className="text-center">
          <Text className="text-3xl font-mada-semibold mt-6 text-center">
            Thank You!
          </Text>
          <Text className="font-medium text-xl m-1">
            Your Request has been sent
          </Text>
        </View>
      </View>

      <View className="flex items-end w-full p-5">
        <Image
          source={require("../../assets/images/work_discussion.png")}
          className="h-[16vh] w-[17vh]"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  shadowPrimary: {
    width: 64,
    height: 64,
    backgroundColor: colors.primary,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
});

export default SuccessMessage;
