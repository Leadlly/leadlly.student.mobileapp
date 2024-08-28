import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import ProfileBox from "../../components/profileComponents/ProfileBox";
import UserLevelPoints from "../../components/profileComponents/UserLevelPoints";
import MoodEmojiSelector from "../../components/profileComponents/MoodEmojiSelectorBox";
import DailyStreakQuestions from "../../components/profileComponents/DailyStreakQuestions";

const Profile = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="my-3 flex-row items-center px-4">
        <Pressable className="mr-5" onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text className="text-xl leading-tight font-mada-semibold">
          Profile
        </Text>
      </View>

      <ScrollView className="px-4 flex-1" showsVerticalScrollIndicator={false}>
        <ProfileBox />
        <UserLevelPoints />
        <MoodEmojiSelector />
        <DailyStreakQuestions />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
