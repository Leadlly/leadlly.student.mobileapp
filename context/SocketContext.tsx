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

  useEffect(() => {
    const fetchUserAndConnectSocket = async () => {
      const socket = io("http://192.168.246.114:3000", {
        transports: ["websocket"],
        withCredentials: true,
        auth: { userToken: user?.token },
      });

      if (socket && user) {
        console.log({ socket, user });

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

    fetchUserAndConnectSocket();
  }, []);

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
