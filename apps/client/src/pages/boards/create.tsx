import React from "react";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox } from "antd";
import { useCrudSocketClient } from "../../common/hooks";
import { IBoard } from "../../interfaces";

export const BoardsCreate: React.FC = () => {
  const { sendCreateEvent } = useCrudSocketClient<IBoard>({
    resource: "boards",
  });
  const { form, formProps, saveButtonProps, queryResult } = useForm<IBoard>({
    redirect: false,
    onMutationSuccess(data, variables, context) {
      sendCreateEvent(data.data);
      form?.resetFields();
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" initialValues={{ isActive: true }}>
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
    </Create>
  );
};
