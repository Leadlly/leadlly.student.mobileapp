import { Text, StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
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
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);
  const currentIndexRef = useSharedValue(currentIndex);

  useEffect(() => {
    currentIndexRef.value = currentIndex;
  }, [currentIndex]);

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
            if (notificationsData.length <= 0) {
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
      [-30, 0, 0],
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
        style={[
          styles.notificationCard,
          {
            zIndex: notificationLength - index,
            width: width - 90,
          },
          animatedStyle,
        ]}
      >
        <Text className="text-lg font-mada-semibold leading-5">
          {notification.message}
        </Text>
        <Text className="text-sm font-mada-semibold leading-5">
          {notification._id}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  notificationCard: {
    height: 240,
    position: "absolute",
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3.5,
  },
});

export default NotificationCard;
