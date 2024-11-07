import { View, Text, Pressable, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Feather, Ionicons } from "@expo/vector-icons";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { colors } from "../../constants/constants";

const AccordionItem = ({
  item,
  isExpanded,
  onToggle,
  onSelectValue,
  selectedValues,
  content,
}: {
  item: {
    _id: string;
    label: string;
    value: string;
  };
  selectedValues: {
    _id: string;
    name: string;
  }[];
  isExpanded: boolean;
  onToggle: () => void;
  onSelectValue: () => void;
  content: React.ReactNode;
}) => {
  const [animation] = useState(new Animated.Value(0));

  const contentHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120],
  });

  const arrowRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);
  return (
    <>
      <View
        className={clsx(
          "flex-row items-center space-x-4 justify-between px-4 py-3 border-b border-input-border",
          isExpanded && "bg-primary/25 border-b-0"
        )}
      >
        <Pressable
          className="flex-row items-center flex-1 space-x-3"
          onPress={onToggle}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: arrowRotation,
                },
              ],
            }}
          >
            <Ionicons name="chevron-down" size={15} color={colors.iconGray} />
          </Animated.View>
          <Text className="flex-1 text-base font-mada-regular leading-5">
            {capitalizeFirstLetter(item.label)}
          </Text>
        </Pressable>
        <Pressable
          key={item.value}
          className="flex-row items-center "
          onPress={onSelectValue}
        >
          <View
            className={clsx(
              "w-4 h-4 rounded border items-center justify-center",
              selectedValues.some((val) => val._id === item._id) &&
                "bg-primary border-primary"
            )}
          >
            {selectedValues.some((val) => val._id === item._id) && (
              <Feather name="check" size={14} color="white" />
            )}
          </View>
        </Pressable>
      </View>
      {isExpanded && (
        <Animated.View
          style={{
            maxHeight: contentHeight,
          }}
        >
          {content}
        </Animated.View>
      )}
    </>
  );
};

export default AccordionItem;
