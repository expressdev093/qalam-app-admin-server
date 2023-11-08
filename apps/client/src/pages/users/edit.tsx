import { Edit, useForm } from "@refinedev/antd";
import {
  HttpError,
  IResourceComponentsProps,
  useApiUrl,
} from "@refinedev/core";
import { Checkbox, Form, Input, Select, Upload, UploadFile } from "antd";

import { useCrudSocketClient, useFileUpload } from "../../common/hooks";
import { normalizeFile, Utils } from "../../common/utils";
import { IUser } from "../../interfaces";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { sendUpdateEvent } = useCrudSocketClient<IUser>({ resource: "users" });
  const { form, formProps, saveButtonProps, onFinish } = useForm<
    IUser,
    HttpError,
    IUser
  >({
    redirect: false,
    onMutationSuccess(data, variables, context) {
      sendUpdateEvent(data.data);
    },
  });
  const apiUrl = useApiUrl();
  const { onChange, onRemove, acceptImages } = useFileUpload();
  const onSubmitFinish = async ({ avatar, ...rest }: any) => {
    const file = (avatar ?? []).length > 0 ? avatar[0] : undefined;
    const newValues: IUser = {
      ...rest,
      avatar: file?.name ?? formProps.initialValues?.avatar,
    };
    await onFinish(newValues);
  };

  const initialValues = {
    ...formProps.initialValues,
    avatar: Utils.getFileList(formProps.initialValues?.avatar),
  };

  const onRemoveFile = async (file: UploadFile<any>) => {
    const response = await onRemove(file, "users/avatar/remove");
    if (response?.data) {
      form.setFieldValue("avatar", []);
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={onSubmitFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="First Name"
          name={["firstName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name={["lastName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name={["email"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Role"
          name={["role"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "User",
                value: "user",
              },
              {
                label: "Admin",
                value: "admin",
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Avatar">
          <Form.Item
            name="avatar"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
          >
            <Upload.Dragger
              accept={acceptImages}
              name="file"
              action={`${apiUrl}/users/avatar`}
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
          label="Is Verified"
          valuePropName="checked"
          name={["isVerified"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>Is Verified</Checkbox>
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
