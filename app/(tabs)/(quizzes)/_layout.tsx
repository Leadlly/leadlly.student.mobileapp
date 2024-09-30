import { MaterialTobTabs } from "../../../components/shared/MaterialTobTabsConfig";
import { colors } from "../../../constants/constants";


const QuizzesLayout = () => {
  return (
    <MaterialTobTabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#000000",
        tabBarLabelStyle: {
          fontSize: 18,
          paddingVertical: 2,
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
        name="unattempted"
        options={{ title: "Unattempted" }}
      />
      <MaterialTobTabs.Screen
        name="attempted"
        options={{ title: "Attempted" }}
      />
    </MaterialTobTabs>
  );
};

export default QuizzesLayout;
