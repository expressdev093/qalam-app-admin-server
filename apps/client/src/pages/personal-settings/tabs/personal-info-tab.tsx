import { Edit, EditButton, useForm } from "@refinedev/antd";
import { IUser } from "../../../interfaces";
import React from "react";
import { HttpError, useApiUrl, useUpdate } from "@refinedev/core";
import { Button, Form, Input, Upload, UploadFile } from "antd";
import { Utils, normalizeFile } from "../../../common/utils";
import { useFileUpload } from "../../../common/hooks";

interface IProps {
  user?: IUser;
  setUser: (user: IUser) => void;
}

export const PersonalInfoTab: React.FC<IProps> = ({ user, setUser }) => {
  const apiUrl = useApiUrl();
  const { mutate } = useUpdate<IUser>();
  const { onChange, onRemove, acceptImages } = useFileUpload();

  const { form, formProps, saveButtonProps, onFinish } = useForm<
    IUser,
    HttpError,
    IUser
  >({
    redirect: false,
    resource: "users",
    mutationMode: "optimistic",
    id: user?.id,
    queryOptions: {
      enabled: user !== undefined,
    },
    onMutationSuccess(data, variables, context) {
      setUser(data.data);
    },
  });

  const onSubmitFinish = async ({ avatar, ...rest }: any) => {
    const file = (avatar ?? []).length > 0 ? avatar[0] : undefined;
    const newValues: IUser = {
      ...rest,
      avatar: file?.name ?? avatar.url,
    };

    mutate(
      {
        resource: "users",
        id: user?.id!,
        values: newValues,
      },
      {
        onSuccess: (data, variables, context) => {
          setUser(data.data);
        },
      }
    );
  };

  const onRemoveFile = async (file: UploadFile<any>) => {
    const response = await onRemove(file, "users/avatar/remove");
    if (response?.data) {
      form.setFieldValue("avatar", []);
    }
  };

  const initialValues = {
    ...formProps.initialValues,
    avatar: Utils.getFileList(formProps.initialValues?.avatar),
  };
  return (
    <div>
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

        <Form.Item>
          <EditButton {...saveButtonProps}>Save Changes</EditButton>
        </Form.Item>
      </Form>
    </div>
  );
};
