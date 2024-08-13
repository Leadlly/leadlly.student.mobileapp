import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTobTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const PlannerLayout = () => {
  return (
    <MaterialTobTabs
      screenOptions={{
        tabBarActiveTintColor: "#9654f4",
        tabBarInactiveTintColor: "#000000",
        tabBarLabelStyle: {
          fontSize: 20,
          fontFamily: "Mada-SemiBold",
          textTransform: "capitalize",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#9654f4",
          height: 3,
          borderRadius: 999,
        },
        tabBarStyle: {
          borderBottomColor: "#D8D5D5",
          borderBottomWidth: 1,
        },
      }}>
      <MaterialTobTabs.Screen name="active" options={{ title: "Active" }} />
      <MaterialTobTabs.Screen
        name="weeklyPlan"
        options={{ title: "Weekly Plan" }}
      />
    </MaterialTobTabs>
  );
};

export default PlannerLayout;
