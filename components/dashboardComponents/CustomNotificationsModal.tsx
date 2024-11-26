import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ModalComponent from "../shared/ModalComponent";
import { TCustomNotificationsType } from "../../types/types";
import NotificationCard from "./NotificationCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

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
      isCloseIcon={false}
      isShadow={false}
      containerClassName="flex-1 bg-transparent"
    >
      <GestureHandlerRootView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <View className="flex-1 items-center justify-center space-y-3 py-3 min-h-[350px] w-full">
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
            <View
              className="bg-white w-full min-h-[350px] items-center justify-center rounded-lg"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 2,
                  height: 4,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 6,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="absolute top-5 right-5"
              >
                <AntDesign name="close" size={15} color="black" />
              </TouchableOpacity>
              <Text className="text-base font-mada-medium text-center text-tab-item-gray">
                No notifications!
              </Text>
            </View>
          )}
        </View>
      </GestureHandlerRootView>
    </ModalComponent>
  );
};

export default CustomNotificationsModal;
