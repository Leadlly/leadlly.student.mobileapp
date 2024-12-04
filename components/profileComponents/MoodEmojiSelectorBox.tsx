import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors, moodEmojis } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../services/redux/hooks";
import { useState } from "react";
import clsx from "clsx";
import Toast from "react-native-toast-message";
import { useSaveTodaysVibe } from "../../services/queries/userQuery";
import { setUser } from "../../services/redux/slices/userSlice";
import { isMoodButtonDisabled } from "../../helpers/utils";

const MoodEmojiSelector = () => {
  const user = useAppSelector((state) => state.user.user);

  const userCurrentMood = user?.details?.mood;

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });

  const currentDateMoodIndex = userCurrentMood?.findIndex(
    (mood) => mood.date === formattedToday
  );

  const [currentMood, setCurrentMood] = useState(
    userCurrentMood &&
      userCurrentMood.length &&
      userCurrentMood?.[currentDateMoodIndex!]?.emoji
      ? userCurrentMood?.[currentDateMoodIndex!]?.emoji
      : "neutral"
  );

  const dispatch = useAppDispatch();

  const {
    mutateAsync: saveTodaysVibe,
    isPending,
    isError,
    error,
  } = useSaveTodaysVibe();

  const handleMoodChange = async (mood: string) => {
    try {
      setCurrentMood(mood);

      const res = await saveTodaysVibe({ todaysVibe: mood });

      dispatch(
        setUser({
          ...user!,
          details: {
            ...user?.details,
            mood: [
              ...(user?.details?.mood || []),
              { day: dayOfWeek, date: formattedToday, emoji: mood },
            ],
          },
        })
      );

      if (isError) {
        return Toast.show({
          type: "error",
          text1: error.message,
        });
      }

      Toast.show({
        type: "success",
        text1: res.message,
      });
    } catch (error: any) {
      setCurrentMood(currentMood);
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  const isDisabled = isMoodButtonDisabled(
    userCurrentMood?.[currentDateMoodIndex!]?.date!
  );
  return (
    <View className="border border-input-border rounded-xl p-4 mb-3">
      <Text className="text-lg font-mada-Bold leading-tight">
        Today&apos;s Vibes
      </Text>
      <Text className="text-sm font-mada-regular leading-tight">
        Sessions and quizzes were insightful and engaging ?
      </Text>

      <View className="mt-5 mb-3 flex-row">
        <View className="flex-1 relative flex-row items-center justify-between">
          <View className="w-[6px] h-[6px] rounded-full bg-primary" />
          {moodEmojis.map((emoji) => (
            <TouchableOpacity
              key={emoji.mood_id}
              onPress={() => handleMoodChange(emoji.mood)}
              disabled={isPending || isDisabled}
              className={clsx(
                "w-[25px] h-[25px] rounded-full transition-all duration-200",
                currentMood === emoji.mood ? "scale-125 opacity-100" : "",
                (isPending || isDisabled) && "opacity-90"
              )}
            >
              <Image
                source={emoji.moodImg}
                resizeMode="contain"
                className={clsx("w-full h-full rounded-full")}
              />
            </TouchableOpacity>
          ))}

          <View className="w-[6px] h-[6px] rounded-full bg-primary" />
          <View className="absolute top-1/2 left-0 -mt-[1px] -z-10 bg-primary w-full h-[2px]" />
        </View>
        {isPending && <ActivityIndicator size={15} color={colors.primary} />}
      </View>
    </View>
  );
};

export default MoodEmojiSelector;
