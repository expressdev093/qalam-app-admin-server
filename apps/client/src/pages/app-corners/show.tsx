import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { IResourceComponents } from "@refinedev/core/dist/interfaces";
import { Card, Col, Image, Row, Typography } from "antd";
import { useCrudSocketClient } from "../../common/hooks";
import { Utils } from "../../common/utils";
import { IAppCorner } from "../../interfaces";
import React, { CSSProperties, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { Title } = Typography;

export const AppCornerShow: React.FC<IResourceComponents> = () => {
  const [appCorner, setAppCorner] = useState<IAppCorner>();
  const { id } = useParams();

  const { queryResult } = useShow<IAppCorner>();
  const queryResultData = queryResult?.data?.data;

  useCrudSocketClient<IAppCorner>({
    resource: "app-corners",
    onUpdated(data) {
      setAppCorner(data);
    },
  });

  useEffect(() => {
    if (queryResultData) {
      setAppCorner(queryResultData);
    }
  }, [queryResultData]);
  return (
    <Show>
      <Row gutter={[16, 16]}>
        <Col xl={12} md={24} sm={24} xs={24}>
          <div style={{ width: "100%" }}>
            {appCorner?.image && (
              <Image
                preview={false}
                src={Utils.getFullUrl(appCorner?.image)}
                style={imageStyle}
                height={400}
                crossOrigin="anonymous"
              />
            )}
          </div>
          <Title>{appCorner?.title}</Title>
          <Card style={{ marginTop: 20 }}>
            <div
              dangerouslySetInnerHTML={{
                __html: appCorner?.description ?? "",
              }}
            ></div>
          </Card>
        </Col>
        <Col xl={12} md={24} sm={24} xs={24}>
          <video
            width="100%"
            src={Utils.getFullUrl(appCorner?.video)}
            crossOrigin="anonymous"
            controls
          />
        </Col>
      </Row>
    </Show>
  );
};

const imageStyle: CSSProperties = {
  width: "100%",
};
