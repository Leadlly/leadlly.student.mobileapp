import { Redirect } from "expo-router";
import { useAppSelector } from "../services/redux/hooks";
import { freeTrialDays } from "../constants/constants";

const WelcomeScreen = () => {
  const { loading, user } = useAppSelector((state) => state.user);
  const userCategory = user?.category || "free";

  if (!loading && !user) return <Redirect href={"/welcome"} />;

  if (!loading && user && !user.academic.standard)
    return <Redirect href={"/initialInfo"} />;

  if (!loading && user && userCategory === "free") {
    const trialStartDate = new Date(user.freeTrial.dateOfActivation!);
    const trialEndDate = new Date(trialStartDate.getTime() + freeTrialDays);
    const now = new Date();

    if (now >= trialEndDate) {
      return <Redirect href={"/subscription-plans"} />;
    }
  }

  return <Redirect href={"/dashboard"} />;
};

export default WelcomeScreen;
