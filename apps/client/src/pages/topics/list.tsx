import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  getDefaultSortOrder,
  List,
  ShowButton,
  useSelect,
} from "@refinedev/antd";
import { IResourceComponents, useMany } from "@refinedev/core";
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
import { ImageView, ResourceSwitch } from "../../components";
import { IChapter, ISubject, ITopic } from "../../interfaces";
import React, { useEffect, useState } from "react";

export const TopicList: React.FC<IResourceComponents> = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>();
  const { tableProps, searchFormProps, sorters, data, count, setList } =
    useCustomTable<ITopic>();

  const { data: chapterData, isLoading: chapterIsLoading } = useMany<IChapter>({
    resource: "chapters",
    ids: Array.from(new Set(data?.map((item) => item?.chapterId) ?? [])),
    queryOptions: {
      enabled: !!data && data.length > 0,
    },
  });

  const { data: subjectData, isLoading: subjectIsLoading } = useMany<ISubject>({
    resource: "subjects",
    ids: Array.from(new Set(data?.map((item) => item?.subjectId) ?? [])),
    queryOptions: {
      enabled: !!data && data.length > 0,
    },
  });

  const { selectProps: subjectSelectProps } = useSelect<ISubject>({
    resource: "subjects",
    optionLabel: "name",
    optionValue: "id",
    onSearch: () => [],
  });

  const { selectProps: chapterSelectProps } = useSelect<IChapter>({
    resource: "chapters",
    optionLabel: "name",
    queryOptions: {
      enabled: selectedSubjectId !== undefined,
    },
    filters: [
      {
        field: "subjectId",
        operator: "eq",
        value: selectedSubjectId,
      },
    ],
    onSearch: () => [],
  });

  const { sendUpdateEvent, sendRemoveEvent } = useCrudSocketClient<ITopic>({
    resource: "topics",
    onUpdated(topic) {
      setList(data.map((s: ITopic) => (s.id === topic.id ? topic : s)));
    },
    onRemoved(topic) {
      setList(data.filter((s: ITopic) => s.id !== topic.id));
    },
    onCreated(topic) {
      setList([...data, topic]);
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={25} xl={6}>
        <Card title="Filter Topics">
          <Form {...searchFormProps} layout="vertical">
            <Form.Item name="name">
              <Input placeholder="Search by name" />
            </Form.Item>
            <Form.Item name="subjectId">
              <Select
                {...subjectSelectProps}
                placeholder="Select Subject"
                onSelect={(value) => {
                  setSelectedSubjectId(parseInt(value as any));
                }}
                filterOption={true}
                optionFilterProp="label"
              />
            </Form.Item>
            <Form.Item name="chapterId">
              <Select
                {...chapterSelectProps}
                placeholder="Select Chapter"
                filterOption={true}
                optionFilterProp="label"
              />
            </Form.Item>
            <Form.Item name="isActive">
              <Select
                placeholder="Filter by active"
                options={[
                  {
                    value: true,
                    label: "Active",
                  },
                  {
                    value: false,
                    label: "Disbaled",
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
                    setSelectedSubjectId(undefined);
                    searchFormProps.form?.setFieldValue("name", undefined);
                    searchFormProps.form?.setFieldValue("isActive", undefined);
                    searchFormProps.form?.setFieldValue("subjectId", undefined);
                    searchFormProps.form?.setFieldValue("chapterId", undefined);
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
            rowKey="id"
            dataSource={data}
            pagination={{
              ...tableProps.pagination,
              size: "small",
              total: count,
            }}
          >
            <Table.Column
              dataIndex="id"
              title={"ID"}
              sorter={{ multiple: 2 }}
              defaultSortOrder={getDefaultSortOrder("id", sorters)}
            />
            <Table.Column
              dataIndex="name"
              title="Name"
              sorter={{ multiple: 1 }}
              defaultSortOrder={getDefaultSortOrder("name", sorters)}
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
              dataIndex="isActive"
              title="Active Status"
              render={(value: boolean, record: ITopic) => (
                <ResourceSwitch
                  resource="topics"
                  name="isActive"
                  checked={value}
                  recordId={record.id}
                  onUpdate={(data) => sendUpdateEvent(data)}
                />
              )}
            />

            <Table.Column
              dataIndex="image"
              title="Image"
              render={(value) => <ImageView path={value} />}
            />

            <Table.Column
              title="Actions"
              dataIndex="actions"
              render={(_text, record: ITopic) => {
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

export default TopicList;
