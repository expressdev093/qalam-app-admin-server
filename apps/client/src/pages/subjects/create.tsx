import { Create, useForm } from "@refinedev/antd";
import { IResourceComponentsProps, useApiUrl } from "@refinedev/core";
import { Checkbox, ColorPicker, Form, Input, Upload } from "antd";

import { useCrudSocketClient, useFileUpload } from "../../common/hooks";
import { normalizeFile, Utils } from "../../common/utils";
import Editor from "../../components/editor";
import { ISubject } from "../../interfaces";

export const SubjectCreate: React.FC<IResourceComponentsProps> = () => {
  const { sendCreateEvent } = useCrudSocketClient<ISubject>({
    resource: "subjects",
  });
  const { formProps, saveButtonProps, queryResult, onFinish } =
    useForm<ISubject>({
      onMutationSuccess(data, variables, context) {
        sendCreateEvent(data?.data);
      },
    });
  const apiUrl = useApiUrl();

  const { onChange, onRemove, acceptImages } = useFileUpload();

  const onSubmitFinish = async ({ image, icon, ...rest }: any) => {
    const file = (image ?? []).length > 0 ? image[0] : undefined;
    const iconFile = (icon ?? []).length > 0 ? icon[0] : undefined;
    const newValues: ISubject = {
      ...rest,
      image: file?.name,
      icon: iconFile?.name,
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
              onRemove={(file) => {
                onRemove(file, "subjects/image/remove");
              }}
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
              onRemove={(file) => {
                onRemove(file, "subjects/image/remove");
              }}
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
          <ColorPicker showText />
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
