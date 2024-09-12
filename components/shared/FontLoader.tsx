import React from "react";
import { useFonts } from "expo-font";

const FontLoader = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded] = useFonts({
    "Mada-Black": require("../../assets/fonts/Mada-Black.ttf"),
    "Mada-Bold": require("../../assets/fonts/Mada-Bold.ttf"),
    "Mada-ExtraBold": require("../../assets/fonts/Mada-ExtraBold.ttf"),
    "Mada-ExtraLight": require("../../assets/fonts/Mada-ExtraLight.ttf"),
    "Mada-Light": require("../../assets/fonts/Mada-Light.ttf"),
    "Mada-Medium": require("../../assets/fonts/Mada-Medium.ttf"),
    "Mada-Regular": require("../../assets/fonts/Mada-Regular.ttf"),
    "Mada-SemiBold": require("../../assets/fonts/Mada-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <>{children}</>;
};

export default FontLoader;
