import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Checkbox, Select } from "antd";
import { IBoardClass } from "../../interfaces";
import { useCrudSocketClient } from "../../common/hooks";

export const BoardClassesCreate: React.FC = () => {
  const { sendCreateEvent } = useCrudSocketClient<IBoardClass>({
    resource: "board-classes",
  });
  const { form, formProps, saveButtonProps, queryResult } =
    useForm<IBoardClass>({
      redirect: false,
      onMutationSuccess(data, variables, context) {
        sendCreateEvent(data.data);
        form.resetFields();
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
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" initialValues={{ isActive: true }}>
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
    </Create>
  );
};
