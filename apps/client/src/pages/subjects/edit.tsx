import { Edit, useForm } from "@refinedev/antd";
import {
  HttpError,
  IResourceComponentsProps,
  useApiUrl,
} from "@refinedev/core";
import { Checkbox, ColorPicker, Form, Input, Upload, UploadFile } from "antd";
import { Events } from "../../common/contants";

import { useCrudSocketClient, useFileUpload } from "../../common/hooks";
import { normalizeFile, Utils } from "../../common/utils";
import Editor from "../../components/editor";
import { ISubject } from "../../interfaces";
import { useEffect } from "react";

export const SubjectEdit: React.FC<IResourceComponentsProps> = () => {
  const { sendUpdateEvent } = useCrudSocketClient<ISubject>({
    resource: "subjects",
  });
  const { form, formProps, saveButtonProps, queryResult, onFinish } = useForm<
    ISubject,
    HttpError,
    ISubject
  >({
    redirect: false,
    onMutationSuccess(data, variables, context) {
      sendUpdateEvent(data.data);
    },
  });
  const apiUrl = useApiUrl();
  const { isLoading, onChange, onRemove, acceptImages } = useFileUpload();
  const onSubmitFinish = async ({ image, icon, ...rest }: any) => {
    const file = (image ?? []).length > 0 ? image[0] : undefined;
    const iconFile = (icon ?? []).length > 0 ? icon[0] : undefined;
    const newValues: ISubject = {
      ...rest,
      image: file?.name ?? record?.image,
      icon: iconFile?.name ?? record?.icon,
      color: rest.color.toHexString(),
    };
    const response = await onFinish(newValues);
  };

  const record = queryResult?.data?.data;

  useEffect(() => {
    if (record) {
      form.setFieldValue("name", record.name);
      form.setFieldValue("isActive", record.isActive);
      form.setFieldValue("description", record.description);
      form.setFieldValue("image", Utils.getFileList(record.image));
      form.setFieldValue("icon", Utils.getFileList(record.icon));
      form.setFieldValue("color", record.color);
    }
  }, [record]);

  const onRemoveFile = async (
    file: UploadFile<any>,
    type: "icon" | "image"
  ) => {
    const response = await onRemove(file, "subjects/image/remove");
    if (response?.data) {
      if (type === "image") {
        form.setFieldValue("image", []);
      } else {
        form.setFieldValue("icon", []);
      }
    }
  };

  const onEvent = (event: string, eventData: any) => {
    if (event === Events.subjects.update) {
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
              action={`${apiUrl}/subjects/image`}
              headers={{
                ...Utils.getAuthorizationHeader(),
              }}
              listType="picture-card"
              onChange={onChange}
              maxCount={1}
              onRemove={(file) => onRemoveFile(file, "image")}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Icon">
          <Form.Item
            name="icon"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
          >
            <Upload.Dragger
              accept={acceptImages}
              name="file"
              action={`${apiUrl}/subjects/image`}
              headers={{
                ...Utils.getAuthorizationHeader(),
              }}
              listType="picture-card"
              onChange={onChange}
              maxCount={1}
              onRemove={(file) => onRemoveFile(file, "icon")}
            >
              <p className="ant-upload-text">
                Drag & drop an icon file in this area
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Color"
          name={["color"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ColorPicker showText format="hex" />
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
