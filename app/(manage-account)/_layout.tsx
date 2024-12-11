import { MaterialTobTabs } from "../../components/shared/MaterialTobTabsConfig";
import { colors } from "../../constants/constants";

const ManageAccountLayout = () => {
  return (
    <MaterialTobTabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#000000",
        tabBarLabelStyle: {
          fontSize: 14,
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
          borderBottomWidth: 1,
        },
      }}
    >
      <MaterialTobTabs.Screen
        name="personalInfo"
        options={{ title: "Personal Info" }}
      />
      <MaterialTobTabs.Screen
        name="studyProgress"
        options={{ title: "Study Progress" }}
      />
      <MaterialTobTabs.Screen
        name="controlPanel"
        options={{ title: "Control Panel" }}
      />
    </MaterialTobTabs>
  );
};

export default ManageAccountLayout;
