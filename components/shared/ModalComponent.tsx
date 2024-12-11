import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import React from "react";
import clsx from "clsx";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";

const ModalComponent = ({
  modalVisible,
  setModalVisible,
  children,
  containerClassName,
  isCloseIcon = true,
  closeIconClassName,
  isSavingDailyQuiz = false,
  handleBackSubmit,
  isShadow = true,
}: {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  containerClassName?: string;
  isCloseIcon?: boolean;
  closeIconClassName?: string;
  isSavingDailyQuiz?: boolean;
  handleBackSubmit?: () => Promise<void>;
  isShadow?: boolean;
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={async () => {
        if (handleBackSubmit) {
          await handleBackSubmit();
        } else {
          setModalVisible(!modalVisible);
        }
      }}
    >
      <BlurView
        intensity={100}
        tint="systemUltraThinMaterialLight"
        className="flex-1 items-center justify-center p-5"
      >
        <View
          className={clsx(
            "relative w-full bg-white p-4 rounded-xl",
            containerClassName
          )}
          style={isShadow ? styles.modalContentContainer : null}
        >
          {children}
          {isCloseIcon && (
            <TouchableOpacity
              className={clsx(
                "absolute top-6 right-4 w-7 h-7 border items-center justify-center rounded-md",
                closeIconClassName
              )}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="close" size={15} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </BlurView>
      <Toast />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContentContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalComponent;
