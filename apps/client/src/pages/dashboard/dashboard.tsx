import { Col, Row } from "antd";
import React from "react";
import Statistic from "./components/statistics";
import "./style.css";

export const Dashboard: React.FC = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6} xl={6} md={12} sm={12} xs={24}>
          <Statistic />
        </Col>
        <Col span={6} xl={6} md={12} sm={12} xs={24}>
          <Statistic />
        </Col>
        <Col span={6} xl={6} md={12} sm={12} xs={24}>
          <Statistic />
        </Col>
        <Col span={6} xl={6} md={12} sm={12} xs={24}>
          <Statistic />
        </Col>
      </Row>
    </>
  );
};
