import { View, Text, Switch } from "react-native";
import { useAppDispatch, useAppSelector } from "../../services/redux/hooks";
import { useState } from "react";
import { useStudentPersonalInfo } from "../../services/queries/userQuery";
import { setUser } from "../../services/redux/slices/userSlice";
import Toast from "react-native-toast-message";
import { colors } from "../../constants/constants";

const ContinuousRevisionPreference = () => {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const userContinuousRevisionPreference =
    user?.preferences?.continuousData?.nextDay;

  const [isRevisionPreference, setIsRevisionPreference] = useState(
    userContinuousRevisionPreference
  );

  const { mutateAsync: studentPersonalInfo } = useStudentPersonalInfo();

  const handleToggleSwitch = async (value: boolean) => {
    try {
      setIsRevisionPreference(value);

      const res = await studentPersonalInfo({
        nextDay: value,
      });

      dispatch(
        setUser({
          ...user,
          ...res.user,
        })
      );
      Toast.show({
        type: "success",
        text1: `Continuous Revision Preference updated to ${res.user.preferences.continuousData.nextDay === true ? "next day" : "current day"}`,
      });
    } catch (error) {
      setIsRevisionPreference(isRevisionPreference);
      Toast.show({
        type: "error",
        text1: "Preference update failed!",
      });
    }
  };

  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="flex-1 text-base font-mada-semibold leading-5">
        Continuous Revision Preference
      </Text>

      <View>
        <Switch
          trackColor={{ false: "#767577", true: colors.primary200 }}
          thumbColor={isRevisionPreference ? colors.primary : "#f4f3f4"}
          onValueChange={handleToggleSwitch}
          value={isRevisionPreference}
        />
      </View>
    </View>
  );
};

export default ContinuousRevisionPreference;
