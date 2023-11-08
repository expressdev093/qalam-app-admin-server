import { Edit, useForm, useSelect } from "@refinedev/antd";
import {
  HttpError,
  IResourceComponentsProps,
  useApiUrl,
} from "@refinedev/core";
import { Checkbox, Form, Input, Select, Upload, UploadFile } from "antd";

import { useCrudSocketClient, useFileUpload } from "../../common/hooks";
import { normalizeFile, Utils } from "../../common/utils";
import Editor from "../../components/editor";
import { IPastPaper, ISubject } from "../../interfaces";
import { useEffect } from "react";

export const PastPapersEdit: React.FC<IResourceComponentsProps> = () => {
  const { sendUpdateEvent } = useCrudSocketClient<IPastPaper>({
    resource: "past-papers",
  });
  const { form, formProps, saveButtonProps, queryResult, onFinish } = useForm<
    IPastPaper,
    HttpError,
    IPastPaper
  >({
    redirect: false,
    onMutationSuccess(data, variables, context) {
      sendUpdateEvent(data.data);
    },
  });
  const apiUrl = useApiUrl();
  const { onChange, onRemove } = useFileUpload();
  const onSubmitFinish = async ({ url, ...rest }: any) => {
    const file = (url ?? []).length > 0 ? url[0] : undefined;
    const newValues: IPastPaper = {
      ...rest,
      url: file?.name ?? null,
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
      form.setFieldValue("year", record.year);
      form.setFieldValue("url", Utils.getFileList(record.url));
    }
  }, [record]);

  const onRemoveFile = async (file: UploadFile<any>) => {
    const response = await onRemove(file, "past-papers/file/remove");
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

        <Form.Item
          label="Paper Year"
          name={["year"]}
          rules={[
            {
              required: true,
            },
            {
              validator: (_, value) => {
                const currentYear = new Date().getFullYear();
                const enteredYear = parseInt(value, 10);

                if (
                  isNaN(enteredYear) ||
                  enteredYear < 1900 ||
                  enteredYear >= currentYear
                ) {
                  return Promise.reject(
                    "Please enter a valid year that is less than the current year"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Editor label="Description" name={["description"]} />

        <Form.Item label="File">
          <Form.Item
            name="url"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
          >
            <Upload.Dragger
              accept={".pdf"}
              name="file"
              action={`${apiUrl}/past-papers/file`}
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
