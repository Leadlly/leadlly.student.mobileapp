import React, { useState } from "react";
import { Animated, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { colors } from "../../constants/constants";

interface AccordionProps {
  header: string;
  content: React.ReactNode;
  efficiency: number;
}

const Accordion: React.FC<AccordionProps> = ({
  header,
  content,
  efficiency,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleAccordion = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const contentHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const arrowRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const getProgressBarColor = (efficiency: number) => {
    if (efficiency < 40) return colors.leadllyRed;
    if (efficiency < 70) return colors.leadllyYellow;
    return colors.leadllyGreen;
  };

  return (
    <View className="my-2 w-full">
      <TouchableOpacity
        onPress={toggleAccordion}
        className="flex-row justify-between items-center"
      >
        <Animated.Text
          style={{ transform: [{ rotate: arrowRotation }] }}
          className="text-lg"
        >
          <Ionicons name="chevron-down" size={15} color={colors.iconGray} />
        </Animated.Text>
        <View className="flex-row justify-between items-center space-x-2">
          <Text
            className="text-sm font-mada-medium w-[60%] capitalize"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {header}
          </Text>
          <View className="flex-row items-center">
            <Progress.Bar
              progress={efficiency / 100}
              color={getProgressBarColor(efficiency)}
              width={100}
              height={5}
            />
            <Text className="font-semibold text-secondary-text ml-2 ">
              {efficiency}%
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Animated.View
        style={{ height: contentHeight }}
        className="overflow-hidden max-h-[200px]"
      >
        {content}
      </Animated.View>
    </View>
  );
};

export default Accordion;
