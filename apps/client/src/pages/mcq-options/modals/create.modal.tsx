import { Form, FormProps, Input, Modal, ModalProps, Checkbox } from "antd";
import { IMcqOption } from "../../../interfaces";
import React, { useEffect, useState } from "react";

interface IProps {
  createModalProps: ModalProps;
  createFormProps: FormProps<IMcqOption>;
  mcqId?: number;
}

export const McqOptionCreateModal: React.FC<IProps> = ({
  createFormProps,
  createModalProps,
  mcqId,
}) => {
  const [isDetailAnswerIsHidden, setIsDetailAnswerIsHidden] =
    useState<boolean>(true);
  const onFinish = async (values: IMcqOption) => {
    const newValues: IMcqOption = {
      ...values,
      mcqId: mcqId ?? values.mcqId,
      detailAnswer: values.isCorrect ? values.detailAnswer : null,
    };
    await createFormProps?.onFinish?.(newValues);
    setIsDetailAnswerIsHidden(true);
  };

  useEffect(() => {
    if (createFormProps.initialValues?.isCorrect) {
      setIsDetailAnswerIsHidden(false);
    } else {
      setIsDetailAnswerIsHidden(true);
    }
  }, [createFormProps.initialValues]);
  return (
    <Modal {...createModalProps} width={500} centered>
      <Form
        {...createFormProps}
        layout="vertical"
        onFinish={onFinish}
        initialValues={createFormProps.initialValues ?? { isCorrect: false }}
      >
        <Form.Item
          label="Option Text"
          name={["text"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          name={["isCorrect"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox
            onChange={(e) => setIsDetailAnswerIsHidden(!e.target.checked)}
          >
            Is Correct
          </Checkbox>
        </Form.Item>
        <Form.Item
          hidden={isDetailAnswerIsHidden}
          label="Detail Answer"
          name={["detailAnswer"]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
