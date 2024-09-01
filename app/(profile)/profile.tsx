import { ScrollView } from "react-native";
import ProfileBox from "../../components/profileComponents/ProfileBox";
import UserLevelPoints from "../../components/profileComponents/UserLevelPoints";
import MoodEmojiSelector from "../../components/profileComponents/MoodEmojiSelectorBox";
import DailyStreakQuestions from "../../components/profileComponents/DailyStreakQuestions";

const Profile = () => {
  return (
    <ScrollView
      className="px-4 flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <ProfileBox />
      <UserLevelPoints />
      <MoodEmojiSelector />
      <DailyStreakQuestions />
    </ScrollView>
  );
};

export default Profile;
