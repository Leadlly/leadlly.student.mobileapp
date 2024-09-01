import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../constants/constants";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { capitalizeFirstLetter } from "../../helpers/utils";

const Select = ({
  items,
  defaultValue,
  onValueChange,
  className,
  placeholder = "Select an item",
  label,
  labelStyle,
  fetching,
  loading,
}: {
  items: { label: string; value: string }[];
  defaultValue: string;
  onValueChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  loading?: boolean;
  fetching?: boolean;
  label?: string;
  labelStyle?: string;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleSelectValue = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
    setShowDropdown(false);
  };

  return (
    <View className="relative w-full mb-4">
      {label ? (
        <Text
          className={clsx(
            "text-lg font-mada-medium leading-tight mb-1",
            labelStyle
          )}
        >
          {label}
        </Text>
      ) : null}
      <Pressable
        className="w-full h-12 bg-white flex-row items-center justify-between px-3 rounded-lg border border-input-border"
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <View className="flex-1">
          <Text
            className={clsx(
              "font-mada-medium text-base leading-tight",
              !selectedValue ? "text-tab-item-gray" : "text-black"
            )}
          >
            {selectedValue ? capitalizeFirstLetter(selectedValue) : placeholder}
          </Text>
        </View>
        <Feather name="chevron-down" size={20} color="black" />
      </Pressable>

      {showDropdown && (
        <Animated.ScrollView
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          className="absolute top-full inset-x-0 z-[99999] bg-white rounded-lg border border-input-border py-1"
          style={{ maxHeight: 250 }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {loading || fetching ? (
            <View>
              <ActivityIndicator size={"small"} color={colors.primary} />
            </View>
          ) : items && items.length > 0 ? (
            items.map((item) => (
              <Pressable
                key={item.value}
                className="h-10 flex-row items-center justify-between px-4 border-b border-input-border"
                onPress={() => handleSelectValue(item.value)}
              >
                <Text>{capitalizeFirstLetter(item.label)}</Text>
                {selectedValue === item.value && (
                  <Feather name="check" size={20} color="black" />
                )}
              </Pressable>
            ))
          ) : (
            <View className="h-10 items-center justify-center">
              <Text className="text-sm leading-tight font-mada-medium text-tab-item-gray">
                No items to show!
              </Text>
            </View>
          )}
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default Select;
