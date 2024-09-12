import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { useAppSelector } from "../../services/redux/hooks";
import { capitalizeFirstLetter } from "../../helpers/utils";
import FreeTrialTimer from "./FreeTrialTimer";
import clsx from "clsx";

const UpgradeAndUserProfileButton = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <View className="mr-4 flex-row items-center gap-4">
      <Link href="/subscription-plans" asChild>
        <TouchableOpacity className="w-[100px] h-9 bg-primary rounded-md items-center justify-center">
          <Text className="text-white leading-tight font-mada-semibold text-xs">
            Upgrade
          </Text>
          {user?.subscription.status !== "active" && <FreeTrialTimer />}
        </TouchableOpacity>
      </Link>

      <Link href="/personalInfo" asChild>
        <TouchableOpacity
          className={clsx(
            "w-10 h-10 rounded-full items-center justify-center",
            user?.avatar && user.avatar.url ? "" : "bg-primary/10"
          )}
        >
          {user?.avatar && user.avatar.url ? (
            <Image
              src={user.avatar.url}
              alt={`${user.firstname}'s avatar`}
              resizeMode="cover"
              className="w-full h-full rounded-full"
            />
          ) : (
            <Text className="text-base text-primary leading-tight font-mada-semibold">
              {capitalizeFirstLetter(user?.firstname.charAt(0))}
              {user?.lastname
                ? capitalizeFirstLetter(user.lastname.charAt(0))
                : ""}
            </Text>
          )}
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default UpgradeAndUserProfileButton;
