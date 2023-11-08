import { Edit, useForm, useSelect } from "@refinedev/antd";
import {
  HttpError,
  IResourceComponentsProps,
  UpdateResponse,
  useApiUrl,
} from "@refinedev/core";

import { Checkbox, Form, Input, Select, Upload, UploadFile } from "antd";

import { useCrudSocketClient, useFileUpload } from "../../common/hooks";
import { normalizeFile, Utils } from "../../common/utils";
import Editor from "../../components/editor";
import { IChapter, ISubject } from "../../interfaces";
import { useEffect } from "react";

export const ChapterEdit: React.FC<IResourceComponentsProps> = () => {
  const { sendUpdateEvent } = useCrudSocketClient<IChapter>({
    resource: "chapters",
  });
  const { form, formProps, saveButtonProps, queryResult, onFinish } = useForm<
    IChapter,
    HttpError,
    IChapter
  >({
    redirect: false,
    onMutationSuccess(data, variables, context) {
      sendUpdateEvent(data.data);
    },
  });
  const apiUrl = useApiUrl();
  const { isLoading, onChange, onRemove, acceptImages } = useFileUpload();
  const onSubmitFinish = async ({ image, ...rest }: any) => {
    const file = (image ?? []).length > 0 ? image[0] : undefined;
    const newValues: IChapter = {
      ...rest,
      image: file?.name ?? null,
    };
    const response = await onFinish(newValues);
  };

  const record = queryResult?.data?.data;

  const { selectProps: subjectSelectProps } = useSelect<ISubject>({
    resource: "subjects",
    optionLabel: "name",

    onSearch: () => [],
  });

  useEffect(() => {
    if (record) {
      form.setFieldValue("name", record.name);
      form.setFieldValue("isActive", record.isActive);
      form.setFieldValue("subjectId", record.subjectId);
      form.setFieldValue("description", record.description);
      form.setFieldValue("image", Utils.getFileList(record.image));
    }
  }, [record]);

  const onRemoveFile = async (file: UploadFile<any>) => {
    const response = await onRemove(file, "chapters/image/remove");
    if (response?.data) {
      form.setFieldValue("image", []);
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={onSubmitFinish}
        initialValues={{ isActive: true }}
      >
        <Form.Item
          label="Title"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Subject"
          name={"subjectId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...subjectSelectProps}
            placeholder="Select Subject"
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Editor label="Description" name={["description"]} />

        <Form.Item label="Image">
          <Form.Item
            name="image"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
          >
            <Upload.Dragger
              accept={acceptImages}
              name="file"
              action={`${apiUrl}/chapters/image`}
              headers={{
                ...Utils.getAuthorizationHeader(),
              }}
              listType="picture-card"
              onChange={onChange}
              maxCount={1}
              onRemove={onRemoveFile}
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
    </Edit>
  );
};
