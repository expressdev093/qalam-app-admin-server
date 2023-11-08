import { BASE_URL } from "../../common/axios";
import React, { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

interface SocketClientProps {
  namespace?: string;
  endpoint?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onEvent?: (event: string, data: any) => void;
}

export const useSocketClient = ({
  endpoint = BASE_URL,
  namespace = "chat",
  onConnect,
  onDisconnect,
  onEvent,
}: SocketClientProps) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(endpoint + "/" + namespace);

    newSocket.on("connect", () => {
      console.log(`Socket connected to ${endpoint}`);

      if (onConnect) {
        onConnect();
      }
    });

    newSocket.on("disconnect", () => {
      console.log(`Socket disconnected from ${endpoint}`);

      if (onDisconnect) {
        onDisconnect();
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (onEvent) {
      socket?.onAny((event, data) => {
        onEvent(event, data);
      });
    }
  }, [socket, onEvent]);

  return {
    socket,
  };
};
