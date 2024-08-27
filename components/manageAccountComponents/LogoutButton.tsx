import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLogoutUser } from "../../services/queries/userQuery";
import { useAppDispatch } from "../../services/redux/hooks";
import Toast from "react-native-toast-message";
import { logoutAction } from "../../services/redux/slices/userSlice";
import { colors } from "../../constants/constants";
import { removeTodaysPlan } from "../../services/redux/slices/plannerSlice";
import { useRouter } from "expo-router";

const LogoutButton = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { mutateAsync: logout, isPending } = useLogoutUser();

  const handleLogout = async () => {
    try {
      const res = await logout();
      dispatch(logoutAction());
      dispatch(removeTodaysPlan());
      router.replace("/login");
      Toast.show({
        type: "success",
        text1: res.message,
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  return (
    <View className="w-full items-center justify-center mt-5">
      <TouchableOpacity
        onPress={() => handleLogout()}
        disabled={isPending}
        className="w-24 h-10 rounded-full bg-primary/10 border border-input-border items-center justify-center">
        {isPending ? (
          <ActivityIndicator size={"small"} color={colors.primary} />
        ) : (
          <Text className="text-primary font-mada-semibold text-base">
            Logout
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LogoutButton;
