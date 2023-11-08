import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  List,
  getDefaultSortOrder,
} from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
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
import { IBoard } from "../../interfaces";
import React from "react";

export const BoardsList: React.FC = () => {
  const {
    tableProps,
    searchFormProps,
    sorters,
    data: boards,
    setList,
    count,
  } = useCustomTable<IBoard>();
  const translate = useTranslate();

  const { sendUpdateEvent, sendRemoveEvent } = useCrudSocketClient<IBoard>({
    resource: "boards",
    onUpdated(board) {
      setList(boards.map((s: IBoard) => (s.id === board.id ? board : s)));
    },
    onRemoved(board) {
      setList(boards.filter((s: IBoard) => s.id !== board.id));
    },
    onCreated(board) {
      setList([...boards, board]);
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={25} xl={6}>
        <Card title="Filter Boards">
          <Form {...searchFormProps} layout="vertical">
            <Form.Item name="name">
              <Input placeholder="Search by name" />
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
            dataSource={boards}
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
              title={translate("subjects.fields.id", "ID")}
              sorter={{ multiple: 2 }}
              defaultSortOrder={getDefaultSortOrder("id", sorters)}
            />

            <Table.Column
              width="50%"
              dataIndex="name"
              title={translate("subjects.fields.name", "Name")}
              sorter={{ multiple: 1 }}
              defaultSortOrder={getDefaultSortOrder("name", sorters)}
            />

            <Table.Column
              dataIndex="isActive"
              title={translate("subjects.fields.isActive", "Active Status")}
              render={(value: boolean, record: IBoard) => (
                <ResourceSwitch
                  resource="boards"
                  name="isActive"
                  checked={value}
                  recordId={record.id}
                  onUpdate={(data) =>
                    sendUpdateEvent({
                      id: record.id,
                      ...data,
                    })
                  }
                />
              )}
            />

            <Table.Column
              title={translate("table.actions", "Actions")}
              dataIndex="actions"
              render={(_text, record: IBoard) => {
                return (
                  <Space align="end">
                    {/* <ShowButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    /> */}
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
