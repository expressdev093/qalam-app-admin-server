import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  getDefaultSortOrder,
  List,
  ShowButton,
  TagField,
} from "@refinedev/antd";
import { IResourceComponentsProps, useMany } from "@refinedev/core";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { useCrudSocketClient, useCustomTable } from "../../common/hooks";
import { ResourceSwitch } from "../../components";
import { IQuiz, ITopic } from "../../interfaces";
import { QuizType } from "../../interfaces/enum";
import React, { useEffect, useState } from "react";

export const QuizList: React.FC<IResourceComponentsProps> = () => {
  const {
    tableProps,
    searchFormProps,
    sorters,
    data: quizes,
    setList,
    count,
  } = useCustomTable<IQuiz>();

  const { sendRemoveEvent, sendUpdateEvent } = useCrudSocketClient<IQuiz>({
    resource: "quizes",
    onUpdated(quiz) {
      setList(quizes.map((s: IQuiz) => (s.id === quiz.id ? quiz : s)));
    },
    onRemoved(quiz) {
      setList(quizes.filter((s: IQuiz) => s.id !== quiz.id));
    },
    onCreated(quiz) {
      setList([...quizes, quiz]);
    },
  });

  const topicsIds = Array.from(
    new Set(
      quizes
        ?.filter((d) => d.type === QuizType.Topic)
        .map((d) => d.entityId!) ?? []
    )
  );

  const subjectIds = Array.from(
    new Set(
      quizes
        ?.filter((d) => d.type === QuizType.Subject)
        .map((d) => d.entityId!) ?? []
    )
  );

  const chapterIds = Array.from(
    new Set(
      quizes
        ?.filter((d) => d.type === QuizType.Chapter)
        .map((d) => d.entityId!) ?? []
    )
  );

  const { data: topicData, isLoading: topicIsLoading } = useMany<ITopic>({
    resource: "topics",
    ids: topicsIds,
    queryOptions: {
      enabled: topicsIds.length > 0,
    },
  });

  const { data: subjectData, isLoading: subjectIsLoading } = useMany<ITopic>({
    resource: "subjects",
    ids: subjectIds,
    queryOptions: {
      enabled: subjectIds.length > 0,
    },
  });

  const { data: chapterData, isLoading: chapterIsLoading } = useMany<ITopic>({
    resource: "chapters",
    ids: chapterIds,
    queryOptions: {
      enabled: chapterIds.length > 0,
    },
  });

  const getNameByType = (quiz: IQuiz) => {
    if (quiz.type === QuizType.Topic)
      return (
        topicData?.data?.find((item) => item.id === quiz.entityId)?.name ?? ""
      );

    if (quiz.type === QuizType.Subject)
      return (
        subjectData?.data?.find((item) => item.id === quiz.entityId)?.name ?? ""
      );

    if (quiz.type === QuizType.Chapter)
      return (
        chapterData?.data?.find((item) => item.id === quiz.entityId)?.name ?? ""
      );

    return "";
  };

  console.log(chapterIds, chapterData);
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={25} xl={6}>
        <Card title="Filter Quiz">
          <Form {...searchFormProps} layout="vertical">
            <Form.Item name="title">
              <Input placeholder="Search by title" />
            </Form.Item>
            <Form.Item label="Type" name={["type"]}>
              <Select
                options={[
                  {
                    value: QuizType.General.toString(),
                    label: "General",
                  },
                  {
                    value: QuizType.Subject.toString(),
                    label: "Subject",
                  },
                  {
                    value: QuizType.Chapter.toString(),
                    label: "Chapter",
                  },
                  {
                    value: QuizType.Topic.toString(),
                    label: "Topic",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  icon={<SearchOutlined />}
                  onClick={searchFormProps.form?.submit}
                >
                  Search
                </Button>
                <Button
                  danger
                  icon={<ClearOutlined />}
                  onClick={() => {
                    searchFormProps.form?.setFieldValue("title", undefined);
                    searchFormProps.form?.setFieldValue("type", undefined);
                    searchFormProps?.form?.submit();
                  }}
                >
                  Clear
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={25} xl={18}>
        <List>
          <Table
            {...tableProps}
            dataSource={quizes}
            pagination={{
              ...tableProps.pagination,
              position: ["bottomRight"],
              size: "small",
              total: count,
            }}
            rowKey="id"
            size="small"
          >
            <Table.Column
              dataIndex="id"
              title={"ID"}
              sorter={{ multiple: 2 }}
              defaultSortOrder={getDefaultSortOrder("id", sorters)}
            />

            <Table.Column
              dataIndex="title"
              title={"Title"}
              sorter={{ multiple: 1 }}
              defaultSortOrder={getDefaultSortOrder("name", sorters)}
            />
            <Table.Column
              dataIndex="type"
              title={"Type"}
              render={(value) => <TagField value={value} />}
            />
            <Table.Column
              dataIndex={["entityId"]}
              title="Subject/Chapter/Topic"
              render={(value, record: IQuiz) => getNameByType(record)}
            />
            <Table.Column
              dataIndex="isActive"
              title="Active Status"
              render={(value: boolean, record: IQuiz) => (
                <ResourceSwitch
                  resource="quizes"
                  name="isActive"
                  checked={value}
                  recordId={record.id}
                  onUpdate={(data) =>
                    sendUpdateEvent({
                      ...record,
                      ...data,
                    })
                  }
                />
              )}
            />

            <Table.Column
              title={"Actions"}
              dataIndex="actions"
              render={(_text, record: IQuiz) => {
                return (
                  <Space align="end">
                    <ShowButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
                    <EditButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
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
      </Col>
    </Row>
  );
};
