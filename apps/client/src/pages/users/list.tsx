import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  EmailField,
  getDefaultSortOrder,
  ImageField,
  List,
  ShowButton,
  TagField,
  useTable,
} from "@refinedev/antd";
import { HttpError, IResourceComponentsProps } from "@refinedev/core";
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
import { Utils } from "../../common/utils";
import { ImageView, ResourceSwitch } from "../../components";
import LoginProviderTag from "../../components/login-provider-tag";
import { IUser } from "../../interfaces";
import { LoginProvider } from "../../interfaces/enum";
import moment from "moment";
import React, { useEffect, useState } from "react";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  //const [users, setUsers] = useState<IUser[]>([]);
  const {
    tableProps,
    searchFormProps,
    sorters,
    data: users,
    setList,
    count,
  } = useCustomTable<IUser>();

  const { sendUpdateEvent, sendRemoveEvent } = useCrudSocketClient<IUser>({
    resource: "users",
    onUpdated(user) {
      setList(users.map((u: IUser) => (u.id === user.id ? user : u)));
    },
    onRemoved(user) {
      setList(users.filter((u: IUser) => u.id !== user.id));
    },
    onCreated(user) {
      setList([...users, user]);
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={25} xl={6}>
        <Card title="Filter Users">
          <Form {...searchFormProps} layout="vertical">
            <Form.Item name="firstName">
              <Input placeholder="Search by first name" />
            </Form.Item>
            <Form.Item name="lastName">
              <Input placeholder="Search by last name" />
            </Form.Item>
            <Form.Item name="email">
              <Input type="email" placeholder="Search by email" />
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
            <Form.Item name="isVerified">
              <Select
                placeholder="Filter by verified"
                options={[
                  {
                    value: true,
                    label: "Verified",
                  },
                  {
                    value: false,
                    label: "Un Verified",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item name="provider">
              <Select
                placeholder="Filter by login provider"
                options={[
                  {
                    value: LoginProvider.EmailPassword,
                    label: "Email/Password",
                  },
                  {
                    value: LoginProvider.Apple,
                    label: "Apple",
                  },
                  {
                    value: LoginProvider.Google,
                    label: "Google",
                  },
                  {
                    value: LoginProvider.Facebook,
                    label: "Facebook",
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
                    searchFormProps.form?.setFieldValue("firstName", undefined);
                    searchFormProps.form?.setFieldValue("lastName", undefined);
                    searchFormProps.form?.setFieldValue("email", undefined);
                    searchFormProps.form?.setFieldValue("isActive", undefined);
                    searchFormProps.form?.setFieldValue(
                      "isVerified",
                      undefined
                    );
                    searchFormProps.form?.setFieldValue("provider", undefined);
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
            dataSource={users}
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
              dataIndex="firstName"
              title="First Name"
              sorter={{ multiple: 3 }}
              defaultSortOrder={getDefaultSortOrder("firstName", sorters)}
            />
            <Table.Column dataIndex="lastName" title="Last Name" />
            <Table.Column
              dataIndex="email"
              title="Email"
              sorter={{ multiple: 2 }}
              defaultSortOrder={getDefaultSortOrder("email", sorters)}
              render={(value: string) => <EmailField value={value} />}
            />
            <Table.Column
              dataIndex="isActive"
              title="Active Status"
              render={(value: boolean, record: IUser) => (
                <ResourceSwitch
                  resource="users"
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
              dataIndex="isVerified"
              title="Verified Status"
              render={(value: boolean, record: IUser) => (
                <TagField
                  color={value ? "green" : "red"}
                  value={value ? "Verified" : "Not Verified"}
                />
              )}
            />
            <Table.Column
              dataIndex="provider"
              title="Provider"
              render={(value: LoginProvider, record: IUser) => (
                <LoginProviderTag value={value} />
              )}
            />
            <Table.Column
              dataIndex="createdAt"
              title="Registerd At"
              render={(value: Date, record: IUser) => moment(value).fromNow()}
            />
            <Table.Column
              dataIndex="avatar"
              title="Avatar"
              render={(avatar: string | undefined, record: IUser) =>
                avatar ? (
                  <ImageField
                    value={Utils.getFullUrl(avatar)}
                    title={record.firstName + " " + record.lastName}
                    width={100}
                    height={100}
                  />
                ) : (
                  <span>No Image</span>
                )
              }
            />
            <Table.Column
              title="Actions"
              dataIndex="actions"
              render={(_text, record: IUser) => {
                return (
                  <Space style={{ textAlign: "right" }}>
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
