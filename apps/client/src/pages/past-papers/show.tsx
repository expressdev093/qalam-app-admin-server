import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { Card, Col, Row, Space, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCalendar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Utils } from "../../common/utils";
import { IPastPaper } from "../../interfaces";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const { Title } = Typography;

export const PastPapersShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IPastPaper>();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: subjectData, isLoading: subjectIsLoading } = useOne({
    resource: "subjects",
    id: record?.subjectId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  console.log();
  return (
    <Show isLoading={isLoading}>
      <Row gutter={[16, 16]}>
        <Col xl={12} md={24} sm={24} xs={24}>
          <Title>{record?.name}</Title>
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Space>
                <FontAwesomeIcon icon={faBook} /> Subject:{" "}
                {subjectData?.data?.name}
              </Space>

              <Space>
                <FontAwesomeIcon icon={faCalendar} />
                Posted On: {moment(record?.createdAt).format("MMM DD , YYYY")}
              </Space>
            </div>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <div
              dangerouslySetInnerHTML={{
                __html: record?.description ?? "",
              }}
            ></div>
          </Card>
        </Col>
        <Col xl={12} md={24} sm={24} xs={24}>
          <DocViewer
            documents={[
              {
                uri: Utils.getFullUrl(record?.url),
              },
            ]}
            style={{ height: "100%" }}
            pluginRenderers={DocViewerRenderers}
          />
        </Col>
      </Row>
    </Show>
  );
};
