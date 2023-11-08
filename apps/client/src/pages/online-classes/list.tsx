import React, { useState, useEffect } from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  BooleanField,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { ResourceSwitch } from "../../components";
import { IChapter, IOnlineClass, ISubject, ITopic } from "../../interfaces";
import { useCrudSocketClient, useCustomTable } from "../../common/hooks";

export const OnlineClassList: React.FC<IResourceComponentsProps> = () => {
  const {
    tableProps,
    searchFormProps,
    sorters,
    data: onlineClasses,
    count,
    setList,
  } = useCustomTable<IOnlineClass>();

  const { data: topicData, isLoading: topicIsLoading } = useMany<ITopic>({
    resource: "topics",
    ids: Array.from(new Set(onlineClasses.map((item) => item?.topicId) ?? [])),
    queryOptions: {
      enabled: onlineClasses.length > 0,
    },
  });

  const { data: chapterData, isLoading: chapterIsLoading } = useMany<IChapter>({
    resource: "chapters",
    ids: Array.from(
      new Set(onlineClasses.map((item) => item?.chapterId) ?? [])
    ),
    queryOptions: {
      enabled: onlineClasses.length > 0,
    },
  });

  const { data: subjectData, isLoading: subjectIsLoading } = useMany<ISubject>({
    resource: "subjects",
    ids: Array.from(
      new Set(onlineClasses.map((item) => item?.subjectId) ?? [])
    ),
    queryOptions: {
      enabled: onlineClasses.length > 0,
    },
  });

  const { sendUpdateEvent, sendRemoveEvent } =
    useCrudSocketClient<IOnlineClass>({
      resource: "online-classes",
      onUpdated(onlineClass) {
        setList(
          onlineClasses.map((u: IOnlineClass) =>
            u.id === onlineClass.id ? onlineClass : u
          )
        );
      },
      onRemoved(onlineClass) {
        setList(
          onlineClasses.filter((u: IOnlineClass) => u.id !== onlineClass.id)
        );
      },
      onCreated(onlineClass) {
        setList([...onlineClasses, onlineClass]);
      },
    });

  return (
    <List>
      <Table {...tableProps} rowKey="id" dataSource={onlineClasses}>
        <Table.Column dataIndex="title" title="Title" />

        <Table.Column
          dataIndex={["startDate"]}
          title="Start Date"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["endDate"]}
          title="End Date"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["isEnded"]}
          title="Is Ended"
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column
          dataIndex={["isActive"]}
          title="Is Active"
          render={(value: boolean, record: IOnlineClass) => (
            <ResourceSwitch
              resource="online-classes"
              name="isActive"
              checked={value}
              recordId={record.id}
              onUpdate={(data) => sendUpdateEvent({ id: record.id, ...data })}
            />
          )}
        />
        <Table.Column
          dataIndex={["topicId"]}
          title="Topic"
          render={(value) =>
            topicIsLoading ? (
              <>Loading...</>
            ) : (
              topicData?.data?.find((item) => item.id === value)?.name
            )
          }
        />
        <Table.Column
          dataIndex={["chapterId"]}
          title="Chapter"
          render={(value) =>
            chapterIsLoading ? (
              <>Loading...</>
            ) : (
              chapterData?.data?.find((item) => item.id === value)?.name
            )
          }
        />
        <Table.Column
          dataIndex={["subjectId"]}
          title="Subject"
          render={(value) =>
            subjectIsLoading ? (
              <>Loading...</>
            ) : (
              subjectData?.data?.find((item) => item.id === value)?.name
            )
          }
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: IOnlineClass) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                onSuccess={(value) => sendRemoveEvent(record)}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
