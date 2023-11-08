import { DeleteButton, EditButton, List, ShowButton } from "@refinedev/antd";
import { IResourceComponentsProps, GetListResponse } from "@refinedev/core";
import { useCrudSocketClient, useCustomTable } from "../../common/hooks";
import { ISupport } from "../../interfaces";
import { Table, Space } from "antd";
import { ResourceSwitch } from "../../components";

export const AppContentList: React.FC<
  IResourceComponentsProps<GetListResponse<{}>>
> = () => {
  const {
    tableProps,
    data: supports,
    setList,
    count,
  } = useCustomTable<ISupport>();

  const { sendUpdateEvent, sendRemoveEvent } = useCrudSocketClient<ISupport>({
    resource: "supports",
    onUpdated(support) {
      setList(
        supports.map((u: ISupport) => (u.id === support.id ? support : u))
      );
    },
    onRemoved(Support) {
      setList(supports.filter((u: ISupport) => u.id !== Support.id));
    },
    onCreated(support) {
      setList([...supports, support]);
    },
  });
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="type" title="Type" />
        <Table.Column
          dataIndex="isActive"
          title="Active Status"
          render={(value: boolean, record: ISupport) => (
            <ResourceSwitch
              resource="supports"
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
          title="Actions"
          dataIndex="actions"
          render={(_text, record: ISupport) => {
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
