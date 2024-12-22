import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../services/redux/hooks";
import React, { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext<{
  socket: Socket | null;
  notifications: { [key: string]: number };
} | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<{ [key: string]: number }>(
    {}
  );

  const user = useAppSelector((state) => state.user.user);
  const CHAT_API_BASE_URL = process.env.EXPO_PUBLIC_CHAT_API_BASE_URL;

  useEffect(() => {
    const connectSocket = async () => {
      const socket = io(CHAT_API_BASE_URL, {
        transports: ["websocket"],
        withCredentials: true,
        auth: { userToken: user?.token },
      });

      if (socket && user) {
        socket.emit("student_joining_room", {
          userEmail: user.email,
        });

        // Listen for notifications
        socket.on("notification", ({ room, messageCount }) => {
          setNotifications((prev) => ({
            ...prev,
            [room]: messageCount,
          }));
        });
      }

      setSocket(socket);

      // Cleanup on component unmount
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    };

    connectSocket();
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
