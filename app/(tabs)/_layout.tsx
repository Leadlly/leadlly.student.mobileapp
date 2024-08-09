import React from "react";
import { Tabs } from "expo-router";
import { tabBarItems } from "../../constants/constants";
import TabBar from "../../components/TabBar";
import { Text, TouchableOpacity } from "react-native";

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
              headerRight: (props) => (
                <TouchableOpacity>
                  <Text>Upgrade</Text>
                </TouchableOpacity>
              ),
            }),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
