import React from "react";
import {
  GoogleCircleFilled,
  LoginOutlined,
  FacebookFilled,
  AppleFilled,
} from "@ant-design/icons";
import { LoginProvider } from "../../interfaces/enum";
import { Space } from "antd";
import { TagField } from "@refinedev/antd";

const LoginProviderTag: React.FC<{ value: LoginProvider }> = ({ value }) => {
  let text = "";
  if (value === LoginProvider.EmailPassword) {
    text = "email/password";
  } else {
    text = value.toString();
  }
  let Icon = LoginOutlined;
  if (value === LoginProvider.Apple) {
    Icon = AppleFilled;
  } else if (value === LoginProvider.Facebook) {
    Icon = FacebookFilled;
  } else if (value === LoginProvider.Google) {
    Icon = GoogleCircleFilled;
  } else {
    Icon = LoginOutlined;
  }
  return (
    <Space>
      <Icon />
      <TagField value={text} />
    </Space>
  );
};

export default LoginProviderTag;
