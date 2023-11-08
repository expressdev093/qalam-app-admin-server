import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  getDefaultSortOrder,
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
import { IChapter, ISubject } from "../../interfaces";
import React from "react";

export const ChapterList: React.FC<IResourceComponents> = () => {
  const { tableProps, searchFormProps, sorters, data, setList, count } =
    useCustomTable<IChapter>();

  const { data: subjectData, isLoading: subjectIsLoading } = useMany<ISubject>({
    resource: "subjects",
    ids: Array.from(
      new Set(data?.map((item: IChapter) => item?.subjectId) ?? [])
    ),
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

  const { sendUpdateEvent, sendRemoveEvent } = useCrudSocketClient<IChapter>({
    resource: "chapters",
    onUpdated(chapter) {
      setList(data.map((s: IChapter) => (s.id === chapter.id ? chapter : s)));
    },
    onRemoved(chapter) {
      setList(data.filter((s: IChapter) => s.id !== chapter.id));
    },
    onCreated(chapter) {
      setList([...data, chapter]);
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={25} xl={6}>
        <Card title="Filter Chapters">
          <Form {...searchFormProps} layout="vertical">
            <Form.Item name="name">
              <Input placeholder="Search by name" />
            </Form.Item>
            <Form.Item name="subjectId">
              <Select
                {...subjectSelectProps}
                placeholder="Select Subject"
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
                    searchFormProps.form?.setFieldValue("name", undefined);
                    searchFormProps.form?.setFieldValue("isActive", undefined);
                    searchFormProps.form?.setFieldValue("subjectId", undefined);
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
              total: count,
              size: "small",
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
              render={(value: boolean, record: IChapter) => (
                <ResourceSwitch
                  resource="chapters"
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
              render={(_text, record: IChapter) => {
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

export default ChapterList;
