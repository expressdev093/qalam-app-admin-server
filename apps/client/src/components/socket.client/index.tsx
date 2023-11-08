import React, { useEffect } from "react";
import io from "socket.io-client";

interface Props {
  url: string;
  onConnect: () => void;
  onDisconnect: () => void;
  onData: (data: any) => void;
}

const SocketClient: React.FC<Props> = ({
  url,
  onConnect,
  onDisconnect,
  onData,
}) => {
  useEffect(() => {
    const socket = io(url);

    socket.on("connect", () => {
      console.log("Socket connected");
      onConnect();
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      onDisconnect();
    });

    socket.on("data", (data: any) => {
      onData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, onConnect, onDisconnect, onData]);

  return null;
};

export default SocketClient;
