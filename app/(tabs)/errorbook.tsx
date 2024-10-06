import { View, ActivityIndicator } from "react-native";
import { useGetErrorBook } from "../../services/queries/errorBookQuery";
import ErrorList from "../../components/ErrorBookComponents/ErrorList";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../services/redux/hooks";
import { useEffect, useState } from "react";
import UpgradePlanPopup from "../../components/shared/UpgradePlanPopup";

const ErrorBook = () => {
  const [isCategory, setIsCategory] = useState(false);

  const userCategory = useAppSelector((state) => state.user.user?.category);

  const { data: errorBookData, isLoading } = useGetErrorBook();

  useEffect(() => {
    if (userCategory === "basic") {
      setIsCategory(true);
    }
  }, [userCategory]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center h-[50vh] bg-white">
        <ActivityIndicator size="large" color="#9654F4" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <ErrorList errorBook={errorBookData?.errorBook || []} />
      </View>
      {isCategory && <UpgradePlanPopup />}
    </SafeAreaView>
  );
};

export default ErrorBook;
