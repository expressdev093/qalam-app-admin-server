import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
} from "@refinedev/antd";
import { IResourceComponentsProps, GetListResponse } from "@refinedev/core";
import { useCrudSocketClient, useCustomTable } from "../../common/hooks";
import { IPrivacyPolicy } from "../../interfaces";
import { Table, Space } from "antd";
import { ResourceSwitch } from "../../components";

export const PrivacyPolicyList: React.FC<
  IResourceComponentsProps<GetListResponse<{}>>
> = () => {
  const {
    tableProps,
    data: privacyPolicies,
    setList,
    count,
  } = useCustomTable<IPrivacyPolicy>();

  const { sendUpdateEvent, sendRemoveEvent } =
    useCrudSocketClient<IPrivacyPolicy>({
      resource: "privacy-policy",
      onUpdated(privacyPolicy) {
        setList(
          privacyPolicies.map((u: IPrivacyPolicy) =>
            u.id === privacyPolicy.id ? privacyPolicy : u
          )
        );
      },
      onRemoved(privacyPolicy) {
        setList(
          privacyPolicies.filter(
            (u: IPrivacyPolicy) => u.id !== privacyPolicy.id
          )
        );
      },
      onCreated(privacyPolicy) {
        setList([...privacyPolicies, privacyPolicy]);
      },
    });
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          dataIndex="isActive"
          title="Active Status"
          render={(value: boolean, record: IPrivacyPolicy) => (
            <ResourceSwitch
              resource="privacy-policy"
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
          dataIndex={["createdAt"]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["updatedAt"]}
          title="Updated At"
          render={(value: any) => <DateField value={value} />}
        />

        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_text, record: IPrivacyPolicy) => {
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
