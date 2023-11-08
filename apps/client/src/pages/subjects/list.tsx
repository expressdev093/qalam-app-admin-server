import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  getDefaultSortOrder,
} from "@refinedev/antd";
import { IResourceComponents, useTranslate } from "@refinedev/core";
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
import { ISubject } from "../../interfaces";
import React from "react";

let i = 0;

export const SubjectList: React.FC<IResourceComponents> = () => {
  //const [subjects, setSubjects] = useState<ISubject[]>([]);
  const {
    tableProps,
    tableQueryResult,
    searchFormProps,
    sorters,
    data,
    count,
    setList,
  } = useCustomTable<ISubject>();
  const translate = useTranslate();

  const { sendUpdateEvent, sendRemoveEvent } = useCrudSocketClient<ISubject>({
    resource: "subjects",
    onUpdated(subject) {
      setList(data.map((s: ISubject) => (s.id === subject.id ? subject : s)));
      tableQueryResult.refetch();
    },
    onRemoved(subject) {
      setList(data.filter((s: ISubject) => s.id !== subject.id));
    },
    onCreated(subject) {
      setList([...data, subject]);
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={25} xl={6}>
        <Card title="Filter Subjects">
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
          <Table<ISubject>
            {...tableProps}
            dataSource={data}
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
              render={(value: boolean, record: ISubject) => (
                <ResourceSwitch
                  resource="subjects"
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
              dataIndex="image"
              title={translate("subjects.fields.image", "Image")}
              render={(value) => <ImageView path={value} />}
            />

            <Table.Column
              title={translate("table.actions", "Actions")}
              dataIndex="actions"
              render={(_text, record: ISubject) => {
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
                      onSuccess={(value) =>
                        sendRemoveEvent({
                          ...value.data,
                          id: record.id,
                        } as ISubject)
                      }
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

export default SubjectList;
