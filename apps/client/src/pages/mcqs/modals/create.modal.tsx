import { Form, FormProps, Input, Modal, ModalProps } from "antd";
import { IMcq } from "../../../interfaces";
import React from "react";

interface IProps {
  createModalProps: ModalProps;
  createFormProps: FormProps<IMcq>;
  exerciseId?: number;
}

export const McqCreateModal: React.FC<IProps> = ({
  createFormProps,
  createModalProps,
  exerciseId,
}) => {
  const onFinish = async (values: IMcq) => {
    const newValues = {
      ...values,
      exerciseId: exerciseId ?? values.exerciseId,
    };
    console.log(newValues);
    createFormProps?.onFinish?.(newValues);
  };

  return (
    <Modal {...createModalProps} width={500} centered>
      <Form
        {...createFormProps}
        layout="vertical"
        onFinish={onFinish}
        initialValues={createFormProps.initialValues ?? { isActive: true }}
      >
        <Form.Item
          label="Mcq Text"
          name={["text"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
