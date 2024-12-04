import {
  Text,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TCustomNotificationsType } from "../../types/types";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useUpdateCustomNotification } from "../../services/queries/userQuery";
import { Extrapolate } from "@shopify/react-native-skia";
import { colors } from "../../constants/constants";
import { FontAwesome } from "@expo/vector-icons";

const NotificationCard = ({
  notification,
  index,
  notificationLength,
  maxVisible,
  animatedValue,
  currentIndex,
  setCurrentIndex,
  notificationsData,
  setNotificationsData,
  setModalVisible,
}: {
  index: number;
  notificationLength: number;
  maxVisible: number;
  animatedValue: SharedValue<number>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  notification: TCustomNotificationsType;
  notificationsData: TCustomNotificationsType[];
  setNotificationsData: React.Dispatch<
    React.SetStateAction<TCustomNotificationsType[]>
  >;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
  const [isMessageExpanded, setIsMessageExpanded] = useState(false);
  const [notificationCardHeight, setNotificationCardHeight] = useState(0);
  const notificationCardRef = useRef<View>(null);

  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);
  const currentIndexRef = useSharedValue(currentIndex);

  useEffect(() => {
    currentIndexRef.value = currentIndex;
  }, [currentIndex]);

  const onNotificationCardLayout = () => {
    if (notificationCardRef.current) {
      notificationCardRef.current.measure((x, y, width, height) => {
        setNotificationCardHeight(height);
      });
    }
  };

  const displayMessage = isMessageExpanded
    ? notification.message
    : notification.message.length > 200
      ? notification.message.slice(0, 200) + "..."
      : notification.message;

  const { mutateAsync: updateNotificationStatus } =
    useUpdateCustomNotification();

  const handleCardDismiss = () => {
    const newData = notificationsData.filter(
      (item) => item._id !== notification._id
    );
    setNotificationsData(newData);

    setCurrentIndex(0);
  };

  const handleUpdateNotificationStatus = async () => {
    await updateNotificationStatus({ id: notification._id, status: "read" });
  };

  const isTopCard = index === 0;

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (isTopCard) {
        const isSwipeRight = e.translationX > 0;
        direction.value = isSwipeRight ? 1 : -1;
        translateX.value = e.translationX;
        animatedValue.value = interpolate(
          Math.abs(e.translationX),
          [0, width],
          [currentIndexRef.value, currentIndexRef.value + 1]
        );
      }
    })
    .onEnd((e) => {
      if (isTopCard) {
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          translateX.value = withTiming(width * direction.value, {}, () => {
            runOnJS(handleCardDismiss)();
            runOnJS(handleUpdateNotificationStatus)();
            if (notificationLength <= 1) {
              runOnJS(setModalVisible)(false);
            }
          });
          animatedValue.value = withTiming(currentIndexRef.value + 1);
        } else {
          translateX.value = withTiming(0, { duration: 500 });
          animatedValue.value = withTiming(currentIndexRef.value, {
            duration: 500,
          });
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, 20],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [-notificationCardHeight * 0.1, 0, 0],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [0.9, 1, 1],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      animatedValue.value + maxVisible,
      [index, index + 1],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: isTopCard ? translateX.value : 0 },
        {
          scale: isTopCard ? 1 : scale,
        },
        {
          translateY: isTopCard ? 0 : translateY,
        },
        {
          rotateZ: isTopCard ? `${direction.value * rotateZ}deg` : "0deg",
        },
      ],
      opacity: index < currentIndex + maxVisible ? 1 : opacity,
    };
  });
  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        ref={notificationCardRef}
        onLayout={onNotificationCardLayout}
        style={[
          styles.notificationCard,
          {
            zIndex: notificationLength - index,
            width: width - 90,
          },
          animatedStyle,
        ]}
      >
        <Text className="text-base text-center text-secondary-text font-mada-medium leading-5">
          {index + 1}/{notificationLength}
        </Text>
        <View className="flex-row items-center space-x-2">
          <FontAwesome name="bell" size={18} color={colors.primary} />

          <Text className="text-base font-mada-semibold">
            Message from your Mentor
          </Text>
        </View>
        <View className="space-y-3">
          <Text className="text-base font-mada-medium leading-5 px-5">
            {displayMessage}
          </Text>
          {notification.message.length > 200 ? (
            <View className="items-end">
              <TouchableOpacity onPress={() => setIsMessageExpanded(true)}>
                <Text className="text-sm font-mada-medium text-secondary-text -mt-2">
                  {isMessageExpanded ? "Read Less" : "...Read More"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {notification.url && notification.url.length > 0 ? (
            <View className="border bg-primary/25 px-5 py-3 rounded-lg">
              <Text className="text-sm font-mada-semibold leading-5">
                More Information -
              </Text>
              {notification.url.map((item, i) => (
                <Text key={i} className="text-sm font-mada-regular leading-5">
                  {item}
                </Text>
              ))}
            </View>
          ) : null}
        </View>

        <Text className="text-xs text-center text-secondary-text font-mada-regular">
          {"<<<"} Swipe to Close {">>>"}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  notificationCard: {
    flex: 1,
    gap: 20,
    minHeight: 240,
    position: "absolute",
    padding: 16,
    backgroundColor: colors.primary50,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
});

export default NotificationCard;
