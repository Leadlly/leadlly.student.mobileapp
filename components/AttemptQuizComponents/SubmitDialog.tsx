import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

type Props = { onSubmit: () => void };

const SubmitDialog = ({ onSubmit }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    setModalVisible(false);
    onSubmit();
  };

  return (
    <View>
      <TouchableOpacity
        className="bg-primary px-4 py-2 rounded-lg shadow-md"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-base font-mada-bold">Submit</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/70">
          <View className="bg-white rounded-3xl p-5 items-center shadow-xl w-4/5 max-w-md">
            <Text className="text-2xl font-mada-bold mb-4 text-center text-gray-800">
              Are you sure you want to submit?
            </Text>
            <Text className="text-base mb-8 text-center text-gray-600 font-mada-medium">
              This action cannot be undone. No changes will be allowed after
              submission.
            </Text>
            <View className="flex-row justify-between w-full space-x-4">
              <TouchableOpacity
                className="bg-gray-300 rounded-lg px-6 py-3 flex-1"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-gray-700 font-mada-bold text-center">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-primary rounded-lg px-6 py-3 flex-1"
                onPress={handleSubmit}
              >
                <Text className="text-white font-mada-bold text-center">Yes, Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SubmitDialog;
