import React from "react";
import { Pressable, Text } from "react-native";

interface TabNavItemProps {
  id: string;
  label: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabNavItem: React.FC<TabNavItemProps> = ({
  id,
  label,
  activeTab,
  setActiveTab,
}) => {
  return (
    <Pressable
      onPress={() => setActiveTab(id)}
      className={`text-xs leading-none capitalize px-3 py-2 rounded-xl ${
        activeTab === id ? "bg-primary/25" : ""
      }`}
    >
      <Text
        className={`font-semibold${
          activeTab === id
            ? " text-black"
            : " text-gray-600"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default TabNavItem;
