import { View, Text, Pressable } from "react-native";
import React from "react";
import ModalComponent from "../shared/ModalComponent";

const QuestionsModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
  return (
    <ModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}>
      <View>
        <Text>Hello Leadlly!!</Text>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Text>Back</Text>
        </Pressable>
      </View>
    </ModalComponent>
  );
};

export default QuestionsModal;
