import { View, Text, Image } from "react-native";
import { useAppSelector } from "../../services/redux/hooks";
import PersonalInfoForm from "../../components/manageAccountComponents/PersonalInfoForm";

const PersonalInfo = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <View className="flex-1 bg-white p-4">
      <View className="items-center">
        <View className="bg-primary/10 rounded-xl p-4 max-w-[256px] w-full items-center justify-center space-y-2">
          <View className="rounded-full w-10 h-10 bg-primary/20 items-center justify-center">
            {user?.avatar?.url ? (
              <Image
                src={user.avatar.url}
                alt={`${user.firstname}'s avatar`}
                resizeMode="contain"
              />
            ) : (
              <Text className="font-mada-semibold text-sm leading-none text-primary capitalize">
                {user?.firstname.charAt(0)}
                {user?.lastname ? user.lastname.charAt(0) : null}
              </Text>
            )}
          </View>

          <View className="items-center">
            <Text className="text-sm font-mada-semibold leading-tight capitalize">
              <Text className="text-primary">Hello,</Text> {user?.firstname}{" "}
              {user?.lastname ? user.lastname : null}
            </Text>

            <Text className="text-[10px] font-mada-regular leading-tight text-center">
              Embrace the course as a catalyst for personal growth and
              empowerment, propelling.
            </Text>
          </View>
        </View>
      </View>

      <PersonalInfoForm user={user} />
    </View>
  );
};

export default PersonalInfo;
