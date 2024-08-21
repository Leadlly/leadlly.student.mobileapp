import { Tabs } from "expo-router";
import { tabBarItems } from "../../constants/constants";
import TabBar from "../../components/TabBar";
import UpgradeAndUserProfileButton from "../../components/dashboardComponents/UpgradeAndUserProfileButton";

const TabsLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      {tabBarItems.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.title,
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Mada-SemiBold",
            },
            ...(item.name === "dashboard" && {
              headerRight: () => <UpgradeAndUserProfileButton />,
            }),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
