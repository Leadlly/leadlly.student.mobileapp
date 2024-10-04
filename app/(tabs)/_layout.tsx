import { Link, Tabs } from "expo-router";
import { tabBarItems } from "../../constants/constants";
import TabBar from "../../components/TabBar";
import UpgradeAndUserProfileButton from "../../components/dashboardComponents/UpgradeAndUserProfileButton";
import { Text, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      {tabBarItems.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.title === "Chat" ? "Mentor" : item.title,
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Mada-SemiBold",
            },
            headerTitleAlign: "left",
            headerRight: () => {
              switch (item.name) {
                case "dashboard":
                  return <UpgradeAndUserProfileButton />;
                case "errorbook":
                  return (
                    <Link href="/error-notes" asChild>
                      <TouchableOpacity className="bg-primary px-3 py-1 mr-5 rounded-lg flex-row  items-center flex ">
                        <Octicons name="pencil" size={13} color="white" />
                        <Text className="text-white font-mada-semibold ml-1.5">
                          Notes
                        </Text>
                      </TouchableOpacity>
                    </Link>
                  );
                default:
                  return null;
              }
            },
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
