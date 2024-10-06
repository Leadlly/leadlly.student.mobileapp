import React from "react";
import { MaterialTobTabs } from "../../components/shared/MaterialTobTabsConfig";
import { colors } from "../../constants/constants";

const ErrorNotesLayout = () => {
  return (
    <MaterialTobTabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#000000",
        tabBarLabelStyle: {
          fontSize: 20,
          fontFamily: "Mada-SemiBold",
          textTransform: "capitalize",
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
          height: 3,
          borderRadius: 999,
        },
        tabBarStyle: {
          borderBottomColor: colors.inputBorder,
        },
      }}
    >
      <MaterialTobTabs.Screen
        name="error-notes"
        options={{ title: "Errors Now" }}
      />
      <MaterialTobTabs.Screen
        name="completed"
        options={{ title: "Completed" }}
      />
    </MaterialTobTabs>
  );
};

export default ErrorNotesLayout;
