import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../constants/constants";
import { Dispatch, SetStateAction, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import clsx from "clsx";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { capitalizeFirstLetter } from "../../helpers/utils";

const MultiSelect = ({
  items,
  defaultValue = [],
  onValueChange,
  className,
  label,
  labelStyle,
  placeholder = "Select options",
  fetching,
  loading,
  maxCount = 4,
}: {
  items: { label: string; value: string }[];
  defaultValue: string[];
  onValueChange: (value: string[]) => void;
  className?: string;
  placeholder?: string;
  loading?: boolean;
  fetching?: boolean;
  label?: string;
  labelStyle?: string;
  maxCount?: number;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange([]);
  };

  const handleSelectValue = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const handleSelectAll = () => {
    if (selectedValues.length === items.length) {
      handleClear();
    } else {
      const allValues = items.map((item) => item.value);
      setSelectedValues(allValues);
      onValueChange(allValues);
      setShowDropdown(false);
    }
  };

  const clearExtraOptions = () => {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
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
        className="w-full bg-white flex-row items-center justify-between p-3 rounded-lg border border-input-border"
        onPress={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
      >
        {selectedValues && selectedValues.length > 0 ? (
          <View className="flex-row flex-1 items-center justify-between">
            <View className="flex-row flex-1 gap-1 flex-wrap">
              {selectedValues.slice(0, maxCount).map((value) => {
                const option = items?.find((o) => o.value === value);
                return (
                  <View
                    key={value}
                    className="bg-primary text-left rounded-full flex-row justify-between items-center px-2 py-1"
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      className="text-white text-xs font-mada-medium leading-tight"
                    >
                      {option?.label}
                    </Text>
                    <Pressable
                      className="ml-2"
                      onPress={(e) => {
                        e.stopPropagation();
                        handleSelectValue(value);
                      }}
                    >
                      <AntDesign name="close" size={12} color="white" />
                    </Pressable>
                  </View>
                );
              })}
              {selectedValues.length > maxCount && (
                <View className="border border-input-border rounded-full flex-row items-center justify-between px-2 py-1 bg-white">
                  <Text className="text-xs font-mada-medium leading-tight">
                    {`+ ${selectedValues.length - maxCount} more`}
                  </Text>
                  <Pressable
                    className="ml-2"
                    onPress={(e) => {
                      e.stopPropagation();
                      clearExtraOptions();
                    }}
                  >
                    <AntDesign name="close" size={12} color="black" />
                  </Pressable>
                </View>
              )}
            </View>
            {selectedValues.length > 0 && (
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              >
                <AntDesign
                  name="close"
                  size={18}
                  color="black"
                  style={{ marginHorizontal: 5 }}
                />
              </Pressable>
            )}
            <Feather name="chevron-down" size={20} color="black" />
          </View>
        ) : (
          <View className="flex-row items-center justify-between flex-1">
            <Text className="font-mada-medium text-base leading-tight text-tab-item-gray">
              {placeholder}
            </Text>
            <Feather name="chevron-down" size={20} color="black" />
          </View>
        )}
      </Pressable>

      {showDropdown && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          className="absolute top-full inset-x-0 z-[9999] bg-white rounded-lg border border-input-border py-1"
          style={{ maxHeight: 250 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {loading || fetching ? (
              <View>
                <ActivityIndicator size={"small"} color={colors.primary} />
              </View>
            ) : items && items.length > 0 ? (
              <>
                <Pressable
                  onPress={() => handleSelectAll()}
                  className="h-10 flex-row items-center px-4 border-b border-input-border"
                >
                  <View
                    className={clsx(
                      "w-4 h-4 rounded border items-center justify-center",
                      selectedValues.length === items.length &&
                        "bg-primary border-primary"
                    )}
                  >
                    {selectedValues.length === items.length && (
                      <Feather name="check" size={14} color="white" />
                    )}
                  </View>
                  <Text className="ml-3 text-base font-mada-medium leading-tight">
                    Select All
                  </Text>
                </Pressable>
                {items.map((item) => (
                  <Pressable
                    key={item.value}
                    className="h-10 flex-row items-center px-4 border-b border-input-border"
                    onPress={() => handleSelectValue(item.value)}
                  >
                    <View
                      className={clsx(
                        "w-4 h-4 rounded border items-center justify-center",
                        selectedValues.includes(item.value) &&
                          "bg-primary border-primary"
                      )}
                    >
                      {selectedValues.includes(item.value) && (
                        <Feather name="check" size={14} color="white" />
                      )}
                    </View>

                    <Text className="ml-3 text-base font-mada-regular leading-tight">
                      {capitalizeFirstLetter(item.label)}
                    </Text>
                  </Pressable>
                ))}
              </>
            ) : (
              <View className="h-10 items-center justify-center">
                <Text className="text-sm leading-tight font-mada-medium text-tab-item-gray">
                  No items to show!
                </Text>
              </View>
            )}
          </ScrollView>

          <View className="fixed bottom-0 inset-x-0 h-10 flex-row items-center justify-between bg-white">
            {selectedValues.length > 0 && (
              <Pressable
                className="items-center justify-center flex-1 border-r border-input-border"
                onPress={() => handleClear()}
              >
                <Text className="text-sm font-mada-medium leading-none">
                  Clear
                </Text>
              </Pressable>
            )}
            <Pressable
              className="items-center justify-center flex-1"
              onPress={() => setShowDropdown(false)}
            >
              <Text className="text-sm font-mada-medium leading-none">
                Close
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default MultiSelect;
