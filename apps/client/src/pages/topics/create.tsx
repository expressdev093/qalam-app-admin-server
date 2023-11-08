import { Create, useForm, useSelect } from "@refinedev/antd";
import {
  HttpError,
  IResourceComponentsProps,
  useApiUrl,
} from "@refinedev/core";
import { Checkbox, Form, Input, Select, Upload } from "antd";

import { useCrudSocketClient, useFileUpload } from "../../common/hooks";
import { normalizeFile, Utils } from "../../common/utils";
import Editor from "../../components/editor";
import { ITopic, IChapter, ISubject } from "../../interfaces";
import { useState } from "react";

export const TopicCreate: React.FC<IResourceComponentsProps> = () => {
  const { sendCreateEvent } = useCrudSocketClient<ITopic>({
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
      form.resetFields();
      sendCreateEvent(data.data);
    },
  });

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

  const apiUrl = useApiUrl();

  const { onChange, onRemove, acceptImages } = useFileUpload();

  const onSubmitFinish = async ({ image, ...rest }: any) => {
    const file = (image ?? []).length > 0 ? image[0] : undefined;
    const newValues: ITopic = {
      ...rest,
      image: file?.name,
    };
    const response = await onFinish(newValues);
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
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
              onRemove={(file) => {
                onRemove(file, "topics/image/remove");
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
    </Create>
  );
};
