import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import React from "react";
import clsx from "clsx";

const ModalComponent = ({
  modalVisible,
  setModalVisible,
  children,
  className,
}: {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  className?: string;
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        console.log("Modal closed!");
        setModalVisible(!modalVisible);
      }}>
      <BlurView
        intensity={100}
        tint="systemUltraThinMaterialLight"
        className="flex-1 items-center justify-center p-5">
        <View
          className={clsx("w-full bg-white p-4 rounded-xl", className)}
          style={styles.modalContentContainer}>
          {children}
        </View>
      </BlurView>
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
