import React from "react";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox } from "antd";
import { useCrudSocketClient } from "../../common/hooks";
import { IBoard } from "../../interfaces";

export const BoardsEdit: React.FC = () => {
  const { sendUpdateEvent } = useCrudSocketClient<IBoard>({
    resource: "boards",
  });
  const { formProps, saveButtonProps, queryResult } = useForm<IBoard>({
    redirect: false,
    onMutationSuccess(data, variables, context) {
      sendUpdateEvent(data.data);
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item valuePropName="checked" name={["isActive"]}>
          <Checkbox>Is Active</Checkbox>
        </Form.Item>
      </Form>
    </Edit>
  );
};
