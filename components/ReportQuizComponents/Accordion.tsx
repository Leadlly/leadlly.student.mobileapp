import React, { useState } from 'react';
import { Animated, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

interface AccordionProps {
  header: string;
  content: React.ReactNode;
  efficiency: number;
}

const Accordion: React.FC<AccordionProps> = ({ header, content, efficiency }) => {
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
    outputRange: ['0%', '100%'],
  });

  const arrowRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const getProgressBarColor = (efficiency: number) => {
    if (efficiency < 40) return "#FF0000";
    if (efficiency < 70) return "#FFA500";
    return "#00FF00";
  };

  return (
    <View className="overflow-hidden max-h-[200px] py-3 w-full">
      <TouchableOpacity
        onPress={toggleAccordion}
        className="flex-row justify-between items-center space-x-3"
      >
        <Animated.Text
          style={{ transform: [{ rotate: arrowRotation }] }}
          className="text-lg"
        >
          <Ionicons name="chevron-down" size={20} color="black" />
        </Animated.Text>
        <View className="flex-row justify-between items-center w-[90%]">
          <Text
            className="text-sm font-mada-medium"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {header}
          </Text>
          <View className="flex-row items-center flex justify-end">
            <Progress.Bar
              progress={efficiency / 100}
              color={getProgressBarColor(efficiency)}
              width={100}
              height={8}
            />
            <Text className="font-semibold text-[#9E9E9E] w-fit text-right ml-2 ">
              {efficiency}%
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Animated.View
        style={{ height: contentHeight }}
        className="overflow-hidden"
      >
        {content}
      </Animated.View>
    </View>
  );
};

export default Accordion;
