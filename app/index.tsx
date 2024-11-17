import { Redirect } from "expo-router";
import { useAppSelector } from "../services/redux/hooks";
import * as Updates from "expo-updates";
import { useEffect } from "react";
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from "sp-react-native-in-app-updates";
import { Platform } from "react-native";

const WelcomeScreen = () => {
  const { loading, user } = useAppSelector((state) => state.user);
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();

  const userCategory = user?.category || "free";

  const inAppUpdates = new SpInAppUpdates(true);

  const checkForBundleUpdates = () => {
    inAppUpdates.checkNeedsUpdate().then((result) => {
      if (result.shouldUpdate) {
        let updateOptions: StartUpdateOptions = {};
        if (Platform.OS === "android") {
          // android only, on iOS the user will be prompted to go to your app store page
          updateOptions = {
            updateType: IAUUpdateKind.IMMEDIATE,
          };
        }
        inAppUpdates.startUpdate(updateOptions);
      }
    });
  };

  useEffect(() => {
    checkForBundleUpdates();
  }, []);

  useEffect(() => {
    if (isUpdatePending) {
      // Update has been successfully downloaded,
      // so reload with the new update bundle
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  if (!loading && !user) return <Redirect href={"/welcome"} />;

  if (!loading && user && !user.academic.standard)
    return <Redirect href={"/initialInfo"} />;

  if (!loading && user && userCategory === "free") {
    const trialEndDate = new Date(user.freeTrial.dateOfDeactivation!);
    const now = new Date();

    if (now >= trialEndDate) {
      return <Redirect href={"/subscription-plans"} />;
    }
  }

  return <Redirect href={"/dashboard"} />;
};

export default WelcomeScreen;
