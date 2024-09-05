import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

const InitialTodoBox = () => {
  return (
    <View className="h-72 rounded-xl p-4 bg-primary/5 my-1.5 items-center justify-center">
      <View className="w-full px-5 space-y-5">
        <Text className="text-primary leading-tight text-xl font-mada-Bold">
          Help us to create your plan,
        </Text>

        <Text className="text-sm leading-tight font-mada-regular">
          Please provide an update on the topics you’ve completed in class so
          far. This will help us ensure we tailor the session to your needs.
        </Text>

        <View className="w-full items-center">
          <Link href={"/studyProgress"} asChild>
            <TouchableOpacity className="w-20 h-8 rounded-md bg-primary items-center justify-center">
              <Text className="text-white text-sm font-mada-semibold leading-tight">
                Start
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default InitialTodoBox;
