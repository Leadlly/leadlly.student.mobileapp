import { Redirect } from "expo-router";
import { useAppSelector } from "../services/redux/hooks";

const WelcomeScreen = () => {
  const { loading, user } = useAppSelector((state) => state.user);

  if (!loading && !user) return <Redirect href={"/welcome"} />;

  return <Redirect href={"/dashboard"} />;
};

export default WelcomeScreen;
