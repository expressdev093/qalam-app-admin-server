import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  List,
  getDefaultSortOrder,
  useSelect,
} from "@refinedev/antd";
import { useMany } from "@refinedev/core";
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
import { IBoard, IBoardClass } from "../../interfaces";
import React from "react";

export const BoardClassesList: React.FC = () => {
  const {
    tableProps,
    searchFormProps,
    sorters,
    data: boardClasses,
    setList,
    count,
  } = useCustomTable<IBoardClass>();

  const { data: boardData, isLoading: subjectIsLoading } = useMany({
    resource: "boards",
    ids: Array.from(
      new Set(boardClasses?.map((item: IBoardClass) => item?.boardId) ?? [])
    ),
    queryOptions: {
      enabled: !!boardClasses && boardClasses.length > 0,
    },
  });

  const { selectProps: boardSelectProps } = useSelect<IBoard>({
    resource: "boards",
    optionLabel: "name",
    optionValue: "id",
    onSearch: () => [],
  });

  const { sendUpdateEvent, sendRemoveEvent } = useCrudSocketClient<IBoardClass>(
    {
      resource: "board-classes",
      onUpdated(data) {
        setList(
          boardClasses.map((s: IBoardClass) => (s.id === data.id ? data : s))
        );
      },
      onRemoved(data) {
        setList(boardClasses.filter((s: IBoardClass) => s.id !== data.id));
      },
      onCreated(data) {
        setList([...boardClasses, data]);
      },
    }
  );

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={25} xl={6}>
        <Card title="Filter Board Classes">
          <Form {...searchFormProps} layout="vertical">
            <Form.Item name="name">
              <Input placeholder="Search by name" />
            </Form.Item>
            <Form.Item name="boardId">
              <Select
                {...boardSelectProps}
                placeholder="Select Boards"
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
                    searchFormProps.form?.setFieldValue("boardId", undefined);
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
            dataSource={boardClasses}
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
              dataIndex={["boardId"]}
              title="Board"
              render={(value) =>
                subjectIsLoading ? (
                  <>Loading...</>
                ) : (
                  boardData?.data?.find((item) => item.id === value)?.name
                )
              }
            />

            <Table.Column
              dataIndex="isActive"
              title="Active Status"
              render={(value: boolean, record: IBoardClass) => (
                <ResourceSwitch
                  resource="board-classes"
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
              render={(_text, record: IBoardClass) => {
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
