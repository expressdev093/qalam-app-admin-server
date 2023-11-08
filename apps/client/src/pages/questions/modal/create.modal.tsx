import {
  Form,
  Modal,
  Input,
  Select,
  FormProps,
  ModalProps,
  Checkbox,
} from "antd";
import Editor from "../../../components/editor";
import { IQuestion } from "../../../interfaces";
import { QuestionType } from "../../../interfaces/enum";
import React from "react";

interface IProps {
  createModalProps: ModalProps;
  createFormProps: FormProps;
  exerciseId?: number;
}

export const QuestionCreateModal: React.FC<IProps> = ({
  createModalProps,
  createFormProps,
  exerciseId,
}) => {
  const onFinish = async (values: IQuestion) => {
    const newValues: IQuestion = {
      ...values,
      exerciseId: exerciseId ?? values.exerciseId,
    };

    await createFormProps?.onFinish?.(newValues);
  };

  return (
    <Modal {...createModalProps}>
      <Form
        {...createFormProps}
        layout="vertical"
        initialValues={
          createFormProps.initialValues
            ? createFormProps.initialValues
            : { isShort: false }
        }
        onFinish={onFinish}
      >
        <Form.Item
          label="Question"
          name="text"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Editor label="Answer" name="answer" />

        <Form.Item
          label="Type"
          name={["type"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                value: QuestionType.Short.toString(),
                label: "Short",
              },
              {
                value: QuestionType.Long.toString(),
                label: "Long",
              },
              {
                value: QuestionType.Important.toString(),
                label: "Important",
              },
              {
                value: QuestionType.Note.toString(),
                label: "Note",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
