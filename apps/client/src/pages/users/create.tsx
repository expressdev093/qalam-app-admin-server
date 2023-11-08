import { Create, useForm } from "@refinedev/antd";
import { IResourceComponentsProps, useApiUrl } from "@refinedev/core";
import { Checkbox, Form, Input, Select, Upload } from "antd";
import { useCrudSocketClient, useFileUpload } from "../../common/hooks";
import { normalizeFile, Utils } from "../../common/utils";
import { IUser } from "../../interfaces";
import { LoginProvider } from "../../interfaces/enum";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const { sendCreateEvent } = useCrudSocketClient<IUser>({ resource: "users" });
  const { formProps, saveButtonProps, onFinish } = useForm<IUser>({
    onMutationSuccess(data, variables, context) {
      sendCreateEvent(data.data);
    },
  });
  const apiUrl = useApiUrl();

  const { onChange, onRemove, acceptImages } = useFileUpload();

  const onSubmitFinish = async ({ avatar, ...rest }: any) => {
    const file = (avatar ?? []).length > 0 ? avatar[0] : undefined;
    const newValues: IUser = {
      ...rest,
      avatar: file?.name,
      provider: LoginProvider.EmailPassword,
    };
    await onFinish(newValues);
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={onSubmitFinish}
        initialValues={{
          isActive: true,
          isVerified: true,
          role: "user",
        }}
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name={["password"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
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
              onRemove={(file) => {
                onRemove(file, "users/avatar/remove");
              }}
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
    </Create>
  );
};
