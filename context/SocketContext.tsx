import io from "socket.io-client";
import { useAppSelector } from "../services/redux/hooks";
import React, { createContext, useContext, useEffect, useState } from "react";

const getSocket = (userToken: string) => {
  return io("http://192.168.248.114:3000", {
    withCredentials: true,
    auth: { userToken },
  });
};

const SocketContext = createContext<{
  socket: ReturnType<typeof io> | null;
}>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  const userToken = useAppSelector((state) => state.user.user?.token);

  useEffect(() => {
    setSocket(getSocket(userToken || ""));
  }, [userToken]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
