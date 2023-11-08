import { IResourceComponentsProps, useShow } from "@refinedev/core";
import React, { useState, useEffect } from "react";
import { Avatar, Card, Col, Row, Typography } from "antd";

import { IUser } from "../../interfaces";

import { BASE_URL } from "../../common";
import { Show, TagField } from "@refinedev/antd";
import "./style.css";
import { useCrudSocketClient } from "../../common/hooks";

const { Title } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const [user, setUser] = useState<IUser>();
  const { queryResult } = useShow<IUser>();
  const { data, isLoading, isError } = queryResult;
  const userData = data?.data;

  useEffect(() => {
    if (userData) setUser(userData);
  }, [userData]);

  useCrudSocketClient<IUser>({
    resource: "users",
    onUpdated(data) {
      setUser(data);
    },
  });

  return (
    <Show>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card style={{ display: "flex", justifyContent: "center" }}>
            <div className="avatar-border">
              <Avatar
                size={128}
                shape="circle"
                src={`${BASE_URL}/${user?.avatar}`}
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
        <Col span={18}></Col>
      </Row>
    </Show>
  );
};
