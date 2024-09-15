import { Text, TouchableOpacity } from "react-native";
import React from "react";
import GoogleIcon from "../icons/GoogleIcon";

const GoogleSignInButton = () => {
  return (
    <TouchableOpacity className="w-full h-12 rounded-lg flex-row items-center justify-center space-x-2 mb-4 border">
      <GoogleIcon />
      <Text className="text-base font-mada-semibold leading-none">
        Sign in with Google
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleSignInButton;
