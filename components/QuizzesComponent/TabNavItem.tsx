import clsx from "clsx";
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
      className={clsx(
        "text-xs leading-none capitalize px-3 py-2 rounded-xl",
        activeTab === id ? "bg-primary/20" : ""
      )}
    >
      <Text
        className={clsx(
          "font-semibold",
          activeTab === id ? "text-primary" : "text-tab-item-gray"
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default TabNavItem;
