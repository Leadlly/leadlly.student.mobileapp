import { View, Text, TouchableOpacity, Image } from "react-native";

const DailyStreakQuestions = () => {
  return (
    <View className="border border-input-border rounded-xl p-4 flex-row">
      <View className="space-y-2">
        <Text className="text-base font-mada-Bold leading-tight">
          Daily Streak Questions
        </Text>
        <Text className="text-sm font-mada-regular leading-tight w-56">
          Daily prompts sustain commitment, motivation.
        </Text>

        <TouchableOpacity
          className="w-28 h-8 bg-primary rounded-lg items-center justify-center opacity-80"
          disabled={true}>
          <Text className="text-white text-sm font-mada-semibold leading-tight">
            Attempt Now
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image source={require("../../assets/images/dsq_image.png")} />
      </View>
    </View>
  );
};

export default DailyStreakQuestions;
