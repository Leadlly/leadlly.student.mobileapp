import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useToggleErrorNote } from "../../services/queries/errorBookQuery";
import Toast from "react-native-toast-message";
import { MaterialIcons } from "@expo/vector-icons";

interface ErrorCardProps {
  note: string;
  id: string;
  isCompleted: boolean;
  isMinimized?: boolean;
}

const ErrorCard: React.FC<ErrorCardProps> = ({
  isCompleted: initialIsCompleted,
  note,
  id,
  isMinimized = true,
}) => {
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const toggleErrorNote = useToggleErrorNote();

  const handleToggle = async () => {
    if (isCompleted) return;
    setIsCompleted(true); // Optimistic update
    try {
      await toggleErrorNote.mutateAsync(id);
   
    } catch (error) {
      setIsCompleted(false);
      Toast.show({
        type: 'error',
        text1: 'Update failed',
        text2: 'Failed to update the error note. Please try again.'
      });
    }
  };

  return (
    <TouchableOpacity
    
      onPress={handleToggle}
      className={`flex-row items-center justify-start bg-white rounded-lg mb-4 border border-[#b690ec] ${
        isMinimized ? "px-2 py-2" : "px-3 py-4"
      } shadow-purple shadow-opacity-18 shadow-radius-16.8 elevation-5`}
    >
      <View className="mr-5">
        {isCompleted ? (
          <MaterialIcons name="check-box" size={24} color="#90EE90" />
        ) : (
          <MaterialIcons name="check-box-outline-blank" size={24} color="#b690ec" />
        )}
      </View>
      <Text
        className={`flex-1 text-[#333333] ${
          isMinimized ? "text-xs" : "text-sm"
        }`}
        numberOfLines={2}
      >
        {note}
      </Text>
    </TouchableOpacity>
  );
};

export default ErrorCard;
