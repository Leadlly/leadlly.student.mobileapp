import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  PanResponder,
} from "react-native";
import React, { useRef, useState } from "react";
import ModalComponent from "../shared/ModalComponent";
import { TCustomNotificationsType } from "../../types/types";
import NotificationCard from "./NotificationCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

const CustomNotificationsModal = ({
  modalVisible,
  setModalVisible,
  notificationsData,
  setNotificationsData,
}: {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  notificationsData: TCustomNotificationsType[];
  setNotificationsData: React.Dispatch<
    React.SetStateAction<TCustomNotificationsType[]>
  >;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const animatedValue = useSharedValue(0);

  const MAX_CARD = 3;

  return (
    <ModalComponent
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
      closeIconClassName="top-3 right-3 border-0"
    >
      <GestureHandlerRootView style={{ maxHeight: 450 }}>
        <View>
          <Text className="text-lg font-mada-semibold leading-5 mb-3">
            Notifications
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          >
            <View className="items-center justify-center space-y-3 py-3 min-h-[350px]">
              {notificationsData && notificationsData.length > 0 ? (
                notificationsData.slice(0, MAX_CARD).map((notification, i) => {
                  return (
                    <NotificationCard
                      key={notification._id}
                      notification={notification}
                      notificationsData={notificationsData}
                      setNotificationsData={setNotificationsData}
                      index={i}
                      notificationLength={notificationsData.length}
                      maxVisible={MAX_CARD}
                      currentIndex={currentIndex}
                      setCurrentIndex={setCurrentIndex}
                      animatedValue={animatedValue}
                      setModalVisible={setModalVisible}
                    />
                  );
                })
              ) : (
                <Text className="text-base font-mada-medium text-center text-tab-item-gray">
                  No notifications!
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </GestureHandlerRootView>
      {notificationsData.length > 0 ? (
        <Text className="text-xs text-tab-item-gray font-mada-medium text-center -mt-5">
          Swipe cards to clear notification!
        </Text>
      ) : null}
    </ModalComponent>
  );
};

export default CustomNotificationsModal;
