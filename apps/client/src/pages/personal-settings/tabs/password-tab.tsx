import { useUpdate, HttpError } from "@refinedev/core";
import { Button, Form, FormInstance, Input } from "antd";
import { IUser } from "../../../interfaces";
import React, { useRef } from "react";

interface IPasswordForm {
  newPassword: string;
  confirmNewPassword: string;
}

const initialValues: IPasswordForm = {
  newPassword: "",
  confirmNewPassword: "",
};

interface IProps {
  user?: IUser;
}

export const PasswordTab: React.FC<IProps> = ({ user }) => {
  const formRef = useRef<FormInstance<IPasswordForm>>(null);
  const { mutate } = useUpdate<IUser, HttpError, { password: string }>();
  const onFinish = (values: IPasswordForm) => {
    mutate(
      {
        resource: "users",
        id: user?.id!,
        values: {
          password: values.newPassword,
        },
      },
      {
        onSuccess(data, variables, context) {
          formRef.current?.resetFields();
        },
      }
    );
  };
  return (
    <div>
      <Form
        ref={formRef}
        name="passwordChange"
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please enter a new password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Please confirm your new password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
