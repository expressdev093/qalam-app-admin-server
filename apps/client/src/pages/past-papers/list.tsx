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
import { IChapter, IPastPaper, ISubject } from "../../interfaces";
import React, { useState, useEffect } from "react";

export const PastPapersList: React.FC<IResourceComponents> = () => {
  const {
    tableProps,
    searchFormProps,
    sorters,
    data: pastPapers,
    setList,
    count,
  } = useCustomTable<IPastPaper>();

  const { data: subjectData, isLoading: subjectIsLoading } = useMany({
    resource: "subjects",
    ids: Array.from(new Set(pastPapers?.map((item) => item?.subjectId) ?? [])),
    queryOptions: {
      enabled: !!pastPapers && pastPapers.length > 0,
    },
  });

  const { selectProps: subjectSelectProps } = useSelect<ISubject>({
    resource: "subjects",
    optionLabel: "name",
    optionValue: "id",
    onSearch: () => [],
  });

  const { sendUpdateEvent, sendRemoveEvent } = useCrudSocketClient<IPastPaper>({
    resource: "past-papers",
    onUpdated(data) {
      setList(pastPapers.map((s: IPastPaper) => (s.id === data.id ? data : s)));
    },
    onRemoved(data) {
      setList(pastPapers.filter((s: IPastPaper) => s.id !== data.id));
    },
    onCreated(data) {
      setList([...pastPapers, data]);
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={25} xl={6}>
        <Card title="Filter Past Paper">
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
            dataSource={pastPapers}
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
                  resource="past-papers"
                  name="isActive"
                  checked={value}
                  recordId={record.id}
                  onUpdate={(data) => sendUpdateEvent(data)}
                />
              )}
            />

            <Table.Column
              title="Actions"
              dataIndex="actions"
              render={(_text, record: IPastPaper) => {
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
