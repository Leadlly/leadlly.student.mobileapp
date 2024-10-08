import { MaterialTobTabs } from "../../../components/shared/MaterialTobTabsConfig";
import { colors } from "../../../constants/constants";

const PlannerLayout = () => {
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
          borderBottomWidth: 1,
        },
      }}
    >
      <MaterialTobTabs.Screen name="active" options={{ title: "Active" }} />
      <MaterialTobTabs.Screen
        name="weeklyPlan"
        options={{ title: "Weekly Plan" }}
      />
    </MaterialTobTabs>
  );
};

export default PlannerLayout;
