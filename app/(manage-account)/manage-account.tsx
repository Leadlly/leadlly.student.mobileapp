import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoutButton from "../../components/manageAccountComponents/LogoutButton";

const ManageAccount = () => {
  return (
    <SafeAreaView>
      <Text>ManageAccount</Text>
      <LogoutButton />
    </SafeAreaView>
  );
};

export default ManageAccount;
