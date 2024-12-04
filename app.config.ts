export default {
  expo: {
    owner: "leadlly_edusolutions_private_limited",
    name: "Leadlly",
    slug: "leadlly",
    version: "1.0.3",
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
      infoPlist: {
        LSApplicationQueriesSchemes: ["itms-apps"],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.leadlly.app",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      versionCode: 9,
    },
    updates: {
      url: "https://u.expo.dev/91b0599c-a56a-4e2e-87b0-a5614b4fd0ae",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-updates",
        {
          username: "leadlly",
        },
      ],
      ["@react-native-google-signin/google-signin"],
      [
        "@react-native-community/datetimepicker",
        {
          android: {
            datePicker: {
              colorAccent: {
                light: "#9654F4",
                dark: "#9654F4",
              },
              textColor: {
                light: "#9654F4",
                dark: "#9654F4",
              },
              textColorPrimary: {
                light: "#9654F4",
                dark: "#9654F4",
              },
              textColorPrimaryInverse: {
                light: "#FFFFFF",
                dark: "#FFFFFF",
              },
              textColorSecondary: {
                light: "#7F7F7F",
                dark: "#7F7F7F",
              },
              textColorSecondaryInverse: {
                light: "#7F7F7F",
                dark: "#7F7F7F",
              },
              colorControlActivated: {
                light: "#9654F4",
                dark: "#9654F4",
              },
              colorControlHighlight: {
                light: "#9654F4",
                dark: "#9654F4",
              },
              windowBackground: {
                light: "#FFFFFF",
                dark: "#FFFFFF",
              },
            },
          },
        },
      ],
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
