import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Pressable,
  SectionList,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import Input from "../../../components/shared/Input";
import { colors } from "../../../constants/constants";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../../context/SocketContext";
import { useAppDispatch, useAppSelector } from "../../../services/redux/hooks";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useGetChatMessages } from "../../../services/queries/chatQuery";
import { ChatMessage, ChatSection } from "../../../types/types";
import { convertToHourMinute } from "../../../helpers/utils";
import { format, isThisWeek, isThisYear, isToday, isYesterday } from "date-fns";

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const chatInputFormSchema = z.object({
  message: z
    .string({ required_error: "Please type a message!" })
    .min(1, { message: "Please type a message!" }),
});

const ChatScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sections, setSections] = useState<ChatSection[]>([]);
  const [messageContainerHeight, setMessageContainerHeight] = useState(0);
  const [inputContainerHeight, setInputContainerHeight] = useState(0);

  const messageContainerRef = useRef<View>(null);
  const inputContainerRef = useRef<View>(null);
  const sectionListRef = useRef<SectionList>(null);

  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const { socket } = useSocket();

  const form = useForm<z.infer<typeof chatInputFormSchema>>({
    resolver: zodResolver(chatInputFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const messageValue = form.watch("message");

  const messageContainerLayout = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.measure((x, y, width, height) => {
        setMessageContainerHeight(height);
      });
    }
  };
  const inputContainerLayout = () => {
    if (inputContainerRef.current) {
      inputContainerRef.current.measure((x, y, width, height) => {
        setInputContainerHeight(height);
      });
    }
  };

  const getDateSection = (date: Date): string => {
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (isThisWeek(date)) {
      return format(date, "EEEE"); // Day name (Monday, Tuesday, etc.)
    } else if (isThisYear(date)) {
      return format(date, "MMMM d"); // Month and day (September 14)
    } else {
      return format(date, "MMMM d, yyyy"); // Full date for older messages
    }
  };

  const groupMessagesByDate = (msgs: ChatMessage[]): ChatSection[] => {
    // Group messages by date section
    const groupedMessages = [...msgs].reduce(
      (groups: { [key: string]: ChatMessage[] }, message) => {
        const section = getDateSection(new Date(message.timestamp));
        if (!groups[section]) {
          groups[section] = [];
        }
        groups[section].push(message);
        return groups;
      },
      {}
    );

    // Convert grouped messages to sections array
    return Object.entries(groupedMessages).map(([title, data]) => ({
      title,
      data,
    }));
  };

  useEffect(() => {
    const newSections = groupMessagesByDate(messages);
    setSections(newSections);
  }, [messages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (sections.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [sections]);

  const scrollToBottom = () => {
    if (sectionListRef.current && sections.length > 0) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex: sections.length - 1,
        itemIndex: sections[sections.length - 1].data.length - 1,
        viewPosition: 1,
      });
    }
  };

  const handleScrollToIndexFailed = () => {
    // If scrolling fails, try again without animation
    const timer = setTimeout(() => {
      if (sectionListRef.current) {
        sectionListRef.current.scrollToLocation({
          animated: false,
          sectionIndex: sections.length - 1,
          itemIndex: sections[sections.length - 1].data.length - 1,
          viewPosition: 1,
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  };

  const { data, isLoading } = useGetChatMessages({
    mentorId: user?.mentor._id,
    studentId: user?._id,
  });

  useEffect(() => {
    if (isLoading) return;

    if (data && data.messages && data.messages.length > 0) {
      setMessages(data.messages);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (socket) {
      socket.on(
        "room_message",
        (data: { message: string; timestamp: string; sendBy: string }) => {
          setMessages((prevMessages) => [...prevMessages, data]);
          console.log("Received room message room event:", data);
        }
      );

      return () => {
        socket.off("room_message");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit("open_chat", { userId: user?._id, room: user?.email });
      // dispatch(unreadMessages(0));
    }
  }, [socket, messages, user, dispatch]);

  const handleMessageSubmit = (data: z.infer<typeof chatInputFormSchema>) => {
    const formattedData = {
      message: data.message,
      sender: user?._id,
      receiver: user?.mentor._id,
      room: user?.email,
      sendBy: user?._id,
      timestamp: new Date(Date.now()).toString(),
      socketId: socket?.id,
    };

    try {
      if (socket) socket.emit("chat_message", formattedData);
      form.reset({ message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <View className="mb-16 bg-white flex-1">
      <View className="flex-1 overflow-hidden">
        <View className="bg-primary/20 flex-row items-center justify-between space-x-3 py-3 px-4">
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

        <View
          ref={messageContainerRef}
          onLayout={messageContainerLayout}
          className="flex-1 pb-3 bg-primary/[0.05]"
        >
          <ImageBackground
            source={require("../../../assets/images/chat_bg.jpg")}
            resizeMode="cover"
            className="absolute top-0 right-0 bottom-0 left-0 opacity-[0.04]"
          />

          <SectionList
            ref={sectionListRef}
            sections={sections}
            renderItem={({ item }) => (
              <Pressable
                className={clsx(
                  "my-2 mx-3 max-w-[50%]",
                  item.sendBy === user?._id
                    ? "ml-auto items-end"
                    : "mr-auto items-start"
                )}
              >
                <View
                  style={styles.boxShadow}
                  className={clsx(
                    "p-2.5 rounded-lg",
                    item.sendBy === user?._id ? "bg-[#EDE2FD]" : "bg-white"
                  )}
                >
                  <Text className="text-base font-mada-regular leading-5">
                    {item.message}
                  </Text>
                </View>
                <Text className="text-xs text-secondary-text font-mada-regular leading-5">
                  {format(item.timestamp, "HH:mm")}
                </Text>
              </Pressable>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View className="items-center justify-center bg-input-border/30 mx-auto px-4 py-1 rounded-md my-1">
                <Text className="text-secondary-text text-xs font-mada-regular">
                  {title}
                </Text>
              </View>
            )}
            onScrollToIndexFailed={handleScrollToIndexFailed}
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
            stickySectionHeadersEnabled={false}
            maintainVisibleContentPosition={{
              autoscrollToTopThreshold: 10,
              minIndexForVisible: 0,
            }}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={21}
            contentContainerStyle={{
              minHeight: messageContainerHeight - inputContainerHeight - 20,
              justifyContent: "flex-end",
            }}
          />

          <View
            ref={inputContainerRef}
            onLayout={inputContainerLayout}
            className="flex-row items-center space-x-1 mt-2 mx-1.5"
          >
            <View
              style={styles.boxShadow}
              className="flex-row flex-1 items-center space-x-3 bg-white rounded-full px-3 py-2"
            >
              <TouchableOpacity>
                <Entypo name="emoji-happy" size={20} color={colors.iconGray} />
              </TouchableOpacity>

              <View className="flex-1">
                <Controller
                  name="message"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="Type a message here..."
                      multiline={true}
                      containerStyle="border-0"
                      inputStyle="px-3 max-h-24"
                    />
                  )}
                />
              </View>
            </View>
            <TouchableOpacity
              className={clsx(
                "bg-primary rounded-full h-11 w-11 items-center justify-center",
                messageValue.length <= 0 && "opacity-70"
              )}
              disabled={messageValue.length <= 0}
              onPress={form.handleSubmit(handleMessageSubmit)}
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
