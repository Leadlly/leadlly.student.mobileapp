import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import Input from "../../../components/shared/Input";
import { colors } from "../../../constants/constants";
import { useState } from "react";

const ChatScreen = () => {
  const [messageValue, setMessageValue] = useState("");

  const handleMessageSubmit = () => {
    console.log(messageValue);
  };

  return (
    <View className="mb-16 bg-white px-3 py-2 flex-1">
      <View className="flex-1 border border-input-border rounded-3xl overflow-hidden">
        <View className="bg-primary/20 flex-row items-center justify-between space-x-3 py-2 px-4">
          <View className="flex-1 flex-row items-center space-x-3">
            <View className="w-11 h-11 rounded-full border border-white bg-white">
              <Image
                source={require("../../../assets/images/teacher.jpg")}
                resizeMode="contain"
                className="w-full h-full rounded-full"
              />
            </View>

            <View className="flex-1">
              <Text
                numberOfLines={1}
                className="flex-1 text-lg font-mada-semibold"
              >
                Mr. Mentor
              </Text>
              <Text className="text-xs text-tab-item-gray font-mada-medium">
                Last seen today at 11:50 PM
              </Text>
            </View>
          </View>

          <View className="flex-row items-center space-x-4">
            <TouchableOpacity>
              <Feather name="phone" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 pb-3 px-3 bg-white">
          <ImageBackground
            source={require("../../../assets/images/chat_bg.jpg")}
            resizeMode="cover"
            className="absolute top-0 right-0 bottom-0 left-0 opacity-10"
          />

          <FlatList
            data={Array.from({ length: 1 })}
            renderItem={({ index, item }) => (
              <TouchableOpacity className="px-2 py-1 rounded-lg bg-white max-w-[40%] w-full my-2">
                <Text>Hello {index + 1}</Text>
              </TouchableOpacity>
            )}
            className="flex-1"
          />

          <View
            style={styles.boxShadow}
            className="flex-row items-center space-x-3 bg-white rounded-full px-3 py-2 mt-2"
          >
            <TouchableOpacity>
              <Entypo name="emoji-happy" size={20} color={colors.iconGray} />
            </TouchableOpacity>

            <View className="flex-1">
              <Input
                value={messageValue}
                onChangeText={(text) => setMessageValue(text)}
                placeholder="Type a message here..."
                multiline={true}
                containerStyle="border-0"
                inputStyle="px-3 max-h-24"
              />
            </View>

            <TouchableOpacity
              className="bg-primary rounded-md px-2.5 h-8 items-center justify-center"
              onPress={handleMessageSubmit}
            >
              <Ionicons
                name="paper-plane"
                size={18}
                color="white"
                style={{
                  transform: [{ rotate: "45deg" }],
                  marginLeft: -3,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1.5,
  },
});

export default ChatScreen;
