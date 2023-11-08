import { HomeOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Card,
  Breadcrumb,
  Row,
  Col,
  Avatar,
  Typography,
  TabsProps,
  Tabs,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import { Utils } from "../../common/utils";
import { TagField } from "@refinedev/antd";
import { PersonalInfoTab } from "./tabs/personal-info-tab";
import { PasswordTab } from "./tabs/password-tab";
import { IUser } from "../../interfaces";

const { Title } = Typography;

export const AdminProfile = () => {
  const authProvider = useActiveAuthProvider();
  const { data } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    setUser(data);
  }, [data]);

  const setUserCallback = useCallback(
    (updatedUser: IUser) => {
      setUser(updatedUser);
    },
    [user]
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <UserOutlined />
          <span>Personal Info</span>
        </>
      ),
      children: <PersonalInfoTab user={user} setUser={setUserCallback} />,
    },
    {
      key: "2",
      label: (
        <>
          <LockOutlined />
          <span>Password</span>
        </>
      ),
      children: <PasswordTab user={user} />,
    },
  ];
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to="/dashboard">
                <HomeOutlined />
                <span>Home</span>
              </Link>
            ),
          },

          {
            title: "Admin Profile",
          },
        ]}
      />
      <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
        <Col xxl={6} xl={8} lg={8} md={24} sm={24} xs={24}>
          <Card style={{ display: "flex", justifyContent: "center" }}>
            <div className="avatar-border">
              <Avatar
                size={128}
                shape="circle"
                src={Utils.getFullUrl(user?.avatar)}
                crossOrigin="anonymous"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Title style={{ padding: 0, margin: 0 }}>
                {user?.firstName} {user?.lastName}
              </Title>
              <TagField color={"green"} value={user?.role} />
            </div>
          </Card>
        </Col>
        <Col xxl={18} xl={16} lg={16} md={24} sm={24} xs={24}>
          <Card>
            <Tabs defaultActiveKey="1" items={items} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
