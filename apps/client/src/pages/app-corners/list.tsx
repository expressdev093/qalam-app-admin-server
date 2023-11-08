import {
  List,
  useTable,
  ShowButton,
  EditButton,
  DeleteButton,
} from "@refinedev/antd";
import { Image, Table, Space } from "antd";
import { ImageView, ResourceSwitch } from "../../components";
import { IAppCorner } from "../../interfaces";
import React, { useEffect, useState } from "react";
import { Utils } from "../../common/utils";
import { useCrudSocketClient, useCustomTable } from "../../common/hooks";

export const AppCornerList: React.FC = () => {
  const {
    tableProps,
    searchFormProps,
    sorters,
    data: appCorners,
    setList,
    count,
  } = useCustomTable<IAppCorner>();

  const { sendUpdateEvent, sendRemoveEvent } = useCrudSocketClient<IAppCorner>({
    resource: "app-corners",
    onUpdated(appCorner) {
      setList(
        appCorners.map((u: IAppCorner) =>
          u.id === appCorner.id ? appCorner : u
        )
      );
    },
    onRemoved(appCorner) {
      setList(appCorners.filter((u: IAppCorner) => u.id !== appCorner.id));
    },
    onCreated(appCorner) {
      setList([...appCorners, appCorner]);
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id" dataSource={appCorners} size="small">
        <Table.Column dataIndex="title" title="Title" />

        <Table.Column
          dataIndex="isActive"
          title="Active Status"
          render={(value: boolean, record: IAppCorner) => (
            <ResourceSwitch
              resource="app-corners"
              name="isActive"
              checked={value}
              recordId={record.id}
              onUpdate={(data) => {
                sendUpdateEvent({
                  id: record.id,
                  ...data,
                });
              }}
            />
          )}
        />
        <Table.Column
          dataIndex="image"
          title="Image"
          render={(value) => <ImageView path={value} />}
        />

        <Table.Column
          dataIndex="videoThumbnail"
          title="Video Thumbnail"
          render={(value) => <ImageView path={value} />}
        />

        <Table.Column
          dataIndex="video"
          title="Video"
          render={(value) => (
            <video
              style={{ maxWidth: "100px" }}
              src={Utils.getFullUrl(value)}
              crossOrigin="anonymous"
            />
          )}
        />

        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_text, record: IAppCorner) => {
            return (
              <Space align="end">
                <ShowButton size="small" recordItemId={record.id} hideText />
                <EditButton size="small" recordItemId={record.id} hideText />
                <DeleteButton
                  size="small"
                  recordItemId={record.id}
                  hideText
                  onSuccess={(value) => sendRemoveEvent(record)}
                />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};

export default AppCornerList;
