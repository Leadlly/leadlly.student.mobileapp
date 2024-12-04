import { AppState } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

const useAppStateChange = () => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        router.setParams({ isReloadingApp: "true" });
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return appState.current;
};

export default useAppStateChange;
