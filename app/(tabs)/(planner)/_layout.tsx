import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { colors } from "../../../constants/constants";

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
