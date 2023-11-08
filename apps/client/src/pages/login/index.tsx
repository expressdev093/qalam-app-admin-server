import React from "react";
import { useLogin, useOnError } from "@refinedev/core";
import {
  Row,
  Col,
  Layout as AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Alert,
} from "antd";
import "./styles.css";

const { Text, Title } = Typography;

export interface ILoginForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [form] = Form.useForm<ILoginForm>();
  const { mutate: onError } = useOnError();

  const { mutate: login, error, isError } = useLogin<ILoginForm>({});

  const CardTitle = (
    <Title level={3} className="title">
      Sign in your account
    </Title>
  );

  return (
    <AntdLayout className="layout">
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col xs={22}>
          <div className="container">
            <div className="imageContainer">
              <img src="/images/logo/logo.svg" alt="Refine Logo" />
            </div>
            <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
              {isError && (
                <Alert
                  showIcon
                  message="Invalid username or password"
                  type="error"
                />
              )}
              <Form<ILoginForm>
                layout="vertical"
                form={form}
                onFinish={(values) => {
                  login(values, {
                    onError(error, variables, context) {},
                  });
                }}
                requiredMark={false}
                initialValues={{
                  remember: false,
                }}
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true }]}
                  style={{ marginBottom: "12px" }}
                >
                  <Input type="password" placeholder="●●●●●●●●" size="large" />
                </Form.Item>
                <div style={{ marginBottom: "12px" }}></div>
                <Button type="primary" size="large" htmlType="submit" block>
                  Sign in
                </Button>
              </Form>
              <div style={{ marginTop: 8 }}></div>
            </Card>
          </div>
        </Col>
      </Row>
    </AntdLayout>
  );
};
