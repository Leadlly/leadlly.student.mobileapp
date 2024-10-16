import { View, ActivityIndicator } from "react-native";
import { useGetErrorBook } from "../../services/queries/errorBookQuery";
import ErrorList from "../../components/ErrorBookComponents/ErrorList";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../services/redux/hooks";
import { useEffect, useState } from "react";
import UpgradePlanPopup from "../../components/shared/UpgradePlanPopup";
import { colors } from "../../constants/constants";
import UpgradationComponent from "../../components/shared/UpgradationComponent";

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
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (isCategory === true) {
    return (
      <UpgradationComponent
        animationSource={require("../../assets/upgrade_2.json")}
        upgradeType="pro"
        tagline="It's time to know your mistakes. Unlock this feature at just Rs"
        featureList={[
          {
            imageSource: require("../../assets/images/questions.png"),
            feature: "Subject and chapter wise division",
          },
          {
            imageSource: require("../../assets/images/quiz.png"),
            feature: "Attempt as quiz",
          },
          {
            imageSource: require("../../assets/images/error_2.png"),
            feature: "Analyze your mistakes",
          },
        ]}
      />
    );
  }

  return (
    <>
      <View className="flex-1 bg-white py-3">
        <ErrorList errorBook={errorBookData?.errorBook || []} />
      </View>
      {isCategory && <UpgradePlanPopup />}
    </>
  );
};

export default ErrorBook;
