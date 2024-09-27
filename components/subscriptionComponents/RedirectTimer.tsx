import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const RedirectTimer = () => {
  const [timeLeft, setTimeLeft] = useState(5);

  const router = useRouter();

  useEffect(() => {
    if (timeLeft < 1) {
      router.replace("/dashboard");
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft, router]);
  return (
    <View className="mt-3">
      <Text className="text-sm font-mada-medium leading-tight text-center">
        Redirecting in <Text className="text-primary">{timeLeft} sec.</Text>
      </Text>
    </View>
  );
};

export default RedirectTimer;
