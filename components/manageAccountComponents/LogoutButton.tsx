import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLogoutUser } from "../../services/queries/userQuery";
import { useAppDispatch } from "../../services/redux/hooks";
import Toast from "react-native-toast-message";
import { logoutAction } from "../../services/redux/slices/userSlice";
import { colors } from "../../constants/constants";
import { removeTodaysPlan } from "../../services/redux/slices/plannerSlice";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const LogoutButton = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { mutateAsync: logout, isPending } = useLogoutUser();

  const handleLogout = async () => {
    try {
      const res = await logout();
      await GoogleSignin.signOut();
      router.replace("/welcome");

      dispatch(logoutAction());
      dispatch(removeTodaysPlan());
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
    <View className="w-full items-center justify-center">
      <TouchableOpacity
        onPress={() => handleLogout()}
        disabled={isPending}
        className="w-20 h-8 rounded-full bg-primary/10 border border-primary items-center justify-center"
      >
        {isPending ? (
          <ActivityIndicator size={10} color={colors.primary} />
        ) : (
          <Text className="text-primary font-mada-semibold text-sm">
            Logout
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LogoutButton;
