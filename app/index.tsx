import { Redirect } from "expo-router";
import { useAppSelector } from "../services/redux/hooks";
import * as Updates from "expo-updates";
import { useEffect } from "react";

const WelcomeScreen = () => {
  const { loading, user } = useAppSelector((state) => state.user);
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();

  const userCategory = user?.category || "free";

  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkForUpdates();
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
