import { UserOutlined } from "@ant-design/icons";
import { Card, Space, Typography } from "antd";
import React, { CSSProperties } from "react";

const Statistic = () => {
  return (
    <Card className="shadow-card">
      <div style={contentStyle}>
        <Space direction="vertical">
          <Typography.Text style={titleStyle}>Today's Sales</Typography.Text>
          <Space>
            <Typography.Title level={3} style={{ fontWeight: "bold" }}>
              $53,000
            </Typography.Title>
            <Typography.Text style={bnb2}>+30%</Typography.Text>
          </Space>
        </Space>
        <div style={iconBox}>
          <UserOutlined style={{ fontSize: 24 }}  />
        </div>
      </div>
    </Card>
  );
};

const titleStyle: CSSProperties = {
  fontWeight: 600,
  color: "#8c8c8c",
  fontSize: 14,
};

const bnb2: CSSProperties = {
  color: "#52c41a",
};

const redText: CSSProperties = {
  color: "red",
};

const contentStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const iconBox: CSSProperties = {
  width: 48,
  height: 48,
  textAlign: "center",
  background: "#1890ff",
  color: "#fff",
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default Statistic;
