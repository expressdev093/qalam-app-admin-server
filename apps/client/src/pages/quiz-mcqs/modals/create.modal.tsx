import { Form, FormProps, Input, Modal, ModalProps } from "antd";
import { IMcq, IQuizMcq } from "../../../interfaces";
import React from "react";

interface IProps {
  createModalProps: ModalProps;
  createFormProps: FormProps<IQuizMcq>;
  quizId?: number;
}

export const QuizMcqModal: React.FC<IProps> = ({
  createFormProps,
  createModalProps,
  quizId,
}) => {
  const onFinish = async (values: IQuizMcq) => {
    const newValues = {
      ...values,
      quizId: quizId ?? values.quizId,
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
