import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../services/redux/store";
import AppWrapper from "../components/AppWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { PaperProvider } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Mada-Black": require("../assets/fonts/Mada-Black.ttf"),
    "Mada-Bold": require("../assets/fonts/Mada-Bold.ttf"),
    "Mada-ExtraBold": require("../assets/fonts/Mada-ExtraBold.ttf"),
    "Mada-ExtraLight": require("../assets/fonts/Mada-ExtraLight.ttf"),
    "Mada-Light": require("../assets/fonts/Mada-Light.ttf"),
    "Mada-Medium": require("../assets/fonts/Mada-Medium.ttf"),
    "Mada-Regular": require("../assets/fonts/Mada-Regular.ttf"),
    "Mada-SemiBold": require("../assets/fonts/Mada-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  const queryClient = new QueryClient();

  if (!fontsLoaded && !error) return null;
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <AppWrapper />
          <Toast />
        </PaperProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default RootLayout;
