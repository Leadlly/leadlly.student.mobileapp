export default {
  expo: {
    name: "Leadlly",
    slug: "leadlly",
    version: "1.0.0",
    scheme: "leadlly-student-app",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.leadlly.app",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-font",
      ["@react-native-google-signin/google-signin"],
    ],
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "91b0599c-a56a-4e2e-87b0-a5614b4fd0ae",
      },
    },
  },
};
