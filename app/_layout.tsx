import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

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

  if (!fontsLoaded && !error) return null;
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
};

export default RootLayout;
