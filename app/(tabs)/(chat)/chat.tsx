import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import Input from "../../../components/shared/Input";
import { colors } from "../../../constants/constants";
import { useEffect, useState } from "react";
import { useSocket } from "../../../context/SocketContext";
import { useAppSelector } from "../../../services/redux/hooks";
import { useRouter } from "expo-router";

const ChatScreen = () => {
  const [messageValue, setMessageValue] = useState("");

  const user = useAppSelector((state) => state.user.user);

  const { socket } = useSocket();

  const router = useRouter();

  const handleMessageSubmit = () => {
    console.log(messageValue);
  };

  const getMessages = async () => {
    if (!user)
      return Alert.alert("No user", "No logged in user available!", [
        {
          text: "Back",
          onPress: () => router.replace("/welcome"),
          style: "cancel",
        },
      ]);
    if (!socket)
      return Alert.alert("No socket", "No socket available!", [
        {
          text: "Back",
          onPress: () => router.replace("/welcome"),
          style: "cancel",
        },
      ]);

    socket.emit("student_joining_room", { userEmail: user.email });
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <View className="mb-16 bg-white p-2 flex-1">
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

        <View className="flex-1 pb-3 bg-primary/[0.03]">
          <ImageBackground
            source={require("../../../assets/images/chat_bg.jpg")}
            resizeMode="cover"
            className="absolute top-0 right-0 bottom-0 left-0 opacity-[0.06]"
          />

          <FlatList
            data={Array.from({ length: 100 })}
            renderItem={({ index, item }) => (
              <Pressable>
                <View
                  style={styles.boxShadow}
                  className="p-2.5 rounded-lg bg-white max-w-[50%] my-2 mx-3"
                >
                  <Text className="text-base font-mada-regular leading-5">
                    Hello {index + 1}
                  </Text>
                </View>
              </Pressable>
            )}
            className="flex-1"
          />

          <View className="flex-row items-center space-x-1 mt-2 mx-1.5">
            <View
              style={styles.boxShadow}
              className="flex-row flex-1 items-center space-x-3 bg-white rounded-full px-3 py-2"
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
            </View>
            <TouchableOpacity
              className="bg-primary rounded-full h-11 w-11 items-center justify-center"
              onPress={handleMessageSubmit}
            >
              <Ionicons
                name="paper-plane"
                size={20}
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
    elevation: 1,
  },
});

export default ChatScreen;
