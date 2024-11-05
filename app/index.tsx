import { Redirect } from "expo-router";
import { useAppSelector } from "../services/redux/hooks";
import { freeTrialDays } from "../constants/constants";

const WelcomeScreen = () => {
  const { loading, user } = useAppSelector((state) => state.user);

  if (!loading && !user) return <Redirect href={"/welcome"} />;

  if (!loading && user && !user.academic.standard)
    return <Redirect href={"/initialInfo"} />;

  return <Redirect href={"/dashboard"} />;
};

export default WelcomeScreen;
