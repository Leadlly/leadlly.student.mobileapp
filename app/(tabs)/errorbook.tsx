import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useGetErrorBook } from "../../services/queries/errorBookQuery";
import ErrorList from "../../components/ErrorBookComponents/ErrorList";
import { SafeAreaView } from "react-native-safe-area-context";
const ErrorBook = () => {
  const router = useRouter();
  const { data: errorBookData, isLoading } = useGetErrorBook();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center h-[50vh] bg-white">
        <ActivityIndicator size="large" color="#9654F4" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <ErrorList errorBook={errorBookData?.errorBook || []} />
      </View>
    </SafeAreaView>
  );
};

export default ErrorBook;
