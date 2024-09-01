import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoutButton from "../../components/manageAccountComponents/LogoutButton";

const PersonalInfo = () => {
  return (
    <View>
      <Text>PersonalInfo</Text>
      <LogoutButton />
    </View>
  );
};

export default PersonalInfo;
