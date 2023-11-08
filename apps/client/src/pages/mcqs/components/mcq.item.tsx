import { PlusOutlined } from "@ant-design/icons";
import { DeleteButton, EditButton, useModalForm } from "@refinedev/antd";
import { BaseKey, HttpError } from "@refinedev/core";
import { Button, Collapse, Space } from "antd";
import { useCrudSocketClient } from "../../../common/hooks";
import { IMcq, IMcqOption } from "../../../interfaces";
import {
  McqOptionCreateModal,
  McqOptionItem,
  useMcqOptionList,
} from "../../mcq-options";
import React from "react";

interface IProps {
  mcq: IMcq;
  onEditShow: (id?: BaseKey | undefined) => void;
  onRemoveSuccess?: (mcq: IMcq) => void;
}

export const McqItem: React.FC<IProps> = ({
  mcq,
  onEditShow,
  onRemoveSuccess,
}) => {
  const { mcqOptions, setMcqOptions } = useMcqOptionList([
    {
      field: "mcqId",
      operator: "eq",
      value: mcq.id,
    },
  ]);

  const { sendCreateEvent, sendRemoveEvent, sendUpdateEvent } =
    useCrudSocketClient<IMcqOption>({
      resource: "mcq-options",
      onCreated(data) {
        setMcqOptions([...mcqOptions, data]);
      },
      onRemoved(data) {
        setMcqOptions(mcqOptions.filter((m) => m.id !== data.id));
      },
      onUpdated(data) {
        setMcqOptions(mcqOptions.map((m) => (m.id === data.id ? data : m)));
      },
    });

  const createMcqOptionModal = useModalForm<IMcqOption, HttpError, IMcqOption>({
    action: "create",
    resource: "mcq-options",
    onMutationSuccess(data, variables, context) {
      sendCreateEvent(data.data);
    },
  });

  const editMcqOptionModal = useModalForm<IMcqOption, HttpError, IMcqOption>({
    action: "edit",
    resource: "mcq-options",
    onMutationSuccess(data, variables, context) {
      sendUpdateEvent(data.data);
    },
  });

  return (
    <>
      <Collapse style={{ marginBottom: 10 }} size="small">
        <Collapse.Panel
          header={mcq.text}
          key={mcq.id}
          extra={
            <Space>
              <Button
                icon={<PlusOutlined />}
                size="small"
                onClick={() => createMcqOptionModal.show()}
              >
                Add Option
              </Button>
              <EditButton
                hideText
                size="small"
                onClick={() => onEditShow(mcq.id)}
              />
              <DeleteButton
                hideText
                recordItemId={mcq.id}
                size="small"
                resource="mcqs"
                onSuccess={(value) => onRemoveSuccess?.(mcq)}
              />
            </Space>
          }
        >
          {mcqOptions.map((mcqOption) => (
            <McqOptionItem
              key={mcqOption.id}
              mcqOption={mcqOption}
              onEditShow={editMcqOptionModal.show}
              onRemoveSuccess={(mcqOption) => sendRemoveEvent(mcqOption)}
            />
          ))}
        </Collapse.Panel>
      </Collapse>
      <McqOptionCreateModal
        mcqId={mcq.id}
        createFormProps={createMcqOptionModal.formProps}
        createModalProps={createMcqOptionModal.modalProps}
      />

      <McqOptionCreateModal
        mcqId={mcq.id}
        createFormProps={editMcqOptionModal.formProps}
        createModalProps={editMcqOptionModal.modalProps}
      />
    </>
  );
};
