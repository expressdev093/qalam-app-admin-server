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
import { ITopic, IChapter, ISubject } from "../../interfaces";
import { useEffect, useState } from "react";

export const TopicEdit: React.FC<IResourceComponentsProps> = () => {
  const { sendUpdateEvent } = useCrudSocketClient<ITopic>({
    resource: "topics",
  });
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>();
  const { form, formProps, saveButtonProps, queryResult, onFinish } = useForm<
    ITopic,
    HttpError,
    ITopic
  >({
    redirect: false,
    onMutationSuccess(data, variables, context) {
      sendUpdateEvent(data.data);
    },
  });
  const apiUrl = useApiUrl();
  const { onChange, onRemove, acceptImages } = useFileUpload();
  const onSubmitFinish = async ({ image, ...rest }: any) => {
    const file = (image ?? []).length > 0 ? image[0] : undefined;
    const newValues: ITopic = {
      ...rest,
      image: file?.name ?? null,
    };
    await onFinish(newValues);
  };

  const record = queryResult?.data?.data;

  const { selectProps: subjectSelectProps } = useSelect<ISubject>({
    resource: "subjects",
    optionLabel: "name",
    optionValue: "id",
    onSearch: () => [],
  });

  const { selectProps: chapterSelectProps } = useSelect<IChapter>({
    resource: "chapters",
    optionLabel: "name",
    queryOptions: {
      enabled: selectedSubjectId !== undefined,
    },
    filters: [
      {
        field: "subjectId",
        operator: "eq",
        value: selectedSubjectId,
      },
    ],
    onSearch: () => [],
  });

  useEffect(() => {
    if (record) {
      form.setFieldValue("name", record.name);
      form.setFieldValue("isActive", record.isActive);
      form.setFieldValue("subjectId", record.chapter?.subjectId);
      form.setFieldValue("chapterId", record.chapterId);
      form.setFieldValue("description", record.description);
      form.setFieldValue("image", Utils.getFileList(record.image));
      setSelectedSubjectId(record?.chapter?.subjectId);
    }
  }, [record]);

  const onRemoveFile = async (file: UploadFile<any>) => {
    const response = await onRemove(file, "topics/image/remove");
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
            onSelect={(value) => {
              setSelectedSubjectId(parseInt(value as any));
            }}
          />
        </Form.Item>
        <Form.Item
          label="Chapter"
          name={"chapterId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...chapterSelectProps}
            placeholder="Select Chapter"
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
              action={`${apiUrl}/topics/image`}
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
