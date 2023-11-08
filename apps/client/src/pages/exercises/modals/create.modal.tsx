import { useApiUrl } from "@refinedev/core";
import {
  Checkbox,
  Form,
  FormProps,
  Input,
  Modal,
  ModalProps,
  Upload,
} from "antd";
import { useFileUpload } from "../../../common/hooks";
import { Utils, normalizeFile } from "../../../common/utils";
import { IExercise } from "../../../interfaces";
import React from "react";

interface IProps {
  createModalProps: ModalProps;
  createFormProps: FormProps<IExercise>;
  chapterId?: number;
}

const ExerciseCreateModal: React.FC<IProps> = ({
  createFormProps,
  createModalProps,
  chapterId,
}) => {
  const apiUrl = useApiUrl();
  const onFinish = async ({ mcqsUrl, questionsUrl, ...values }: any) => {
    const mcqFile: any = (mcqsUrl ?? []).length > 0 ? mcqsUrl[0] : undefined;
    const questionFile: any =
      (questionsUrl ?? []).length > 0 ? questionsUrl[0] : undefined;
    const newValues = {
      ...values,
      chapterId: chapterId ?? values.chapterId,
      mcqsUrl: mcqFile?.name,
      questionsUrl: questionFile?.name,
    };
    await createFormProps?.onFinish?.(newValues);
  };

  const mcqFileUpload = useFileUpload();
  const questionsFileUpload = useFileUpload();

  return (
    <Modal {...createModalProps}>
      <Form
        {...createFormProps}
        layout="vertical"
        onFinish={onFinish}
        initialValues={createFormProps.initialValues ?? { isActive: true }}
      >
        <Form.Item
          label="Title"
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name={["description"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item label="Mcqs file">
          <Form.Item
            name="mcqsUrl"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload.Dragger
              accept={".xlsx"}
              name="file"
              action={`${apiUrl}/exercises/exercise-file`}
              headers={{
                ...Utils.getAuthorizationHeader(),
              }}
              listType="picture-card"
              onChange={mcqFileUpload.onChange}
              maxCount={1}
              onRemove={(file) => {
                mcqFileUpload.onRemove(file, "exercises/exercise-file/remove");
              }}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item label="Questions file">
          <Form.Item
            name="questionsUrl"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload.Dragger
              accept={".xlsx"}
              name="file"
              action={`${apiUrl}/exercises/exercise-file`}
              headers={{
                ...Utils.getAuthorizationHeader(),
              }}
              listType="picture-card"
              onChange={questionsFileUpload.onChange}
              maxCount={1}
              onRemove={(file) => {
                questionsFileUpload.onRemove(
                  file,
                  "exercises/exercise-file/remove"
                );
              }}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Is Active"
          valuePropName="checked"
          name={["isActive"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>Is Active</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExerciseCreateModal;
