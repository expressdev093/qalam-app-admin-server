import React from "react";

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Checkbox, Select } from "antd";
import { IBoardClass } from "../../interfaces";
import { useCrudSocketClient } from "../../common/hooks";
import { UpdateResponse } from "@refinedev/core";

export const BoardClassesEdit: React.FC = () => {
  const { sendUpdateEvent } = useCrudSocketClient<IBoardClass>({
    resource: "board-classes",
  });
  const { formProps, saveButtonProps, queryResult } = useForm<IBoardClass>({
    redirect: false,
    onMutationSuccess(data, variables, context) {
      sendUpdateEvent(data.data);
    },
  });

  const boardClassesData = queryResult?.data?.data;

  const { selectProps: boardSelectProps } = useSelect({
    resource: "boards",
    defaultValue: boardClassesData?.boardId,
    optionLabel: "name",
    onSearch: () => [],
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Board"
          name={"boardId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...boardSelectProps}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
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
