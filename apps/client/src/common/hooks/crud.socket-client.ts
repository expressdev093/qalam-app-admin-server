import { useSocketClient } from "./socket.io.hook";
import { useNotification, OpenNotificationParams } from "@refinedev/core";

interface ICrudClientProps<T> {
  resource: string;
  onUpdated?: (data: T) => void;
  onCreated?: (data: T) => void;
  onRemoved?: (data: T) => void;
  updateNotificationParam?: OpenNotificationParams;
  createNotificationParam?: OpenNotificationParams;
  removeNotificationParam?: OpenNotificationParams;
}

export const useCrudSocketClient = <T>(props: ICrudClientProps<T>) => {
  const { open } = useNotification();
  const {
    resource,
    onCreated,
    onRemoved,
    onUpdated,
    updateNotificationParam,
    createNotificationParam,
    removeNotificationParam,
  } = props;
  const onEvent = (event: string, eventdata: any) => {
    console.log(resource, event, eventdata);
    if (event === `update`) {
      displayNotification("edited", eventdata, updateNotificationParam);
      onUpdated?.(eventdata);
    }
    if (event === `create`) {
      displayNotification("created", eventdata, createNotificationParam);
      onCreated?.(eventdata);
    }

    if (event === `remove`) {
      displayNotification("removed", eventdata, removeNotificationParam);
      onRemoved?.(eventdata);
    }
  };

  const sendCreateEvent = (data: T, acknowledgement?: (res: any) => void) => {
    socket?.emit(`create`, data, (res: any) => {
      acknowledgement?.(res);
    });
  };

  const sendUpdateEvent = (data: T, acknowledgement?: (res: any) => void) => {
    socket?.emit(`update`, data, (res: any) => {
      acknowledgement?.(res);
    });
  };

  const sendRemoveEvent = (data: T, acknowledgement?: (res: any) => void) => {
    socket?.emit(`remove`, data, (res: any) => {
      acknowledgement?.(res);
    });
  };

  const displayNotification = (
    action: string,
    eventData: any,
    params?: OpenNotificationParams
  ) => {
    // open?.(params ?? {
    //     type: "success",
    //     message: `Successfully ${action} ${resource}`,
    //     description: "Successful",
    //     key: `${resource}_updated_${eventData.id}`,
    //   });
  };

  const { socket } = useSocketClient({ onEvent, namespace: `api/${resource}` });

  return {
    socket,
    sendCreateEvent,
    sendUpdateEvent,
    sendRemoveEvent,
  };
};
