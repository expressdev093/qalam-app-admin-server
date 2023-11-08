import { PlusOutlined } from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  List,
  Show,
  ShowButton,
} from "@refinedev/antd";
import { HttpError, useList, useShow } from "@refinedev/core";
import {
  Card,
  Col,
  Image,
  Row,
  Space,
  Typography,
  List as AntdList,
} from "antd";
import { Utils } from "../../common/utils";
import { IChapter, IExercise, ISubject } from "../../interfaces";
import React, { CSSProperties, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCalendar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useChapterList } from "../chapters";
import { useCrudSocketClient } from "../../common/hooks";

const { Title, Paragraph } = Typography;

export const SubjectShow: React.FC = () => {
  const [subject, setSubject] = useState<ISubject>();
  const { id } = useParams();
  useCrudSocketClient<ISubject>({
    resource: "subjects",
    onUpdated(data) {
      setSubject(data);
    },
  });
  const { queryResult } = useShow<IChapter>();
  const queryResultData = queryResult?.data?.data;

  const { chapters, setChapters } = useChapterList([
    {
      field: "subjectId",
      operator: "eq",
      value: id,
    },
  ]);

  const { sendRemoveEvent } = useCrudSocketClient<IChapter>({
    resource: "chapters",
    onCreated(data) {
      setChapters([...chapters, data]);
    },
    onRemoved(data) {
      setChapters(chapters.filter((c: IChapter) => c.id !== data.id));
    },
    onUpdated(data) {
      setChapters(chapters.map((c: IChapter) => (c.id === data.id ? data : c)));
    },
  });

  useEffect(() => {
    if (queryResultData) {
      setSubject(queryResultData);
    }
  }, [queryResultData]);

  return (
    <Show>
      <Row gutter={[16, 16]}>
        <Col xl={12} md={24} sm={24} xs={24}>
          <div style={{ width: "100%" }}>
            {subject?.image && (
              <Image
                preview={false}
                src={Utils.getFullUrl(subject?.image)}
                style={imageStyle}
                height={400}
                crossOrigin="anonymous"
              />
            )}
          </div>
          <Title>{subject?.name}</Title>
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Space>
                <FontAwesomeIcon icon={faBook} /> Subject: {subject?.name}
              </Space>

              <Space>
                <FontAwesomeIcon icon={faCalendar} />
                Posted On: {moment(subject?.createdAt).format("MMM DD , YYYY")}
              </Space>
            </div>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <div
              dangerouslySetInnerHTML={{
                __html: subject?.description ?? "",
              }}
            ></div>
          </Card>
        </Col>
        <Col xl={12} md={24} sm={24} xs={24}>
          <List resource="chapters" breadcrumb={null}>
            <AntdList
              bordered
              dataSource={chapters}
              renderItem={(item: IChapter) => (
                <AntdList.Item key={item.id}>
                  <AntdList.Item.Meta description={item.name} />
                  <Space>
                    <ShowButton
                      resource="chapters"
                      size="small"
                      hideText
                      recordItemId={item.id}
                    />
                    <EditButton
                      resource="chapters"
                      size="small"
                      hideText
                      recordItemId={item.id}
                    />
                    <DeleteButton
                      resource="chapters"
                      size="small"
                      hideText
                      recordItemId={item.id}
                      onSuccess={(value: any) => sendRemoveEvent(item)}
                    />
                  </Space>
                </AntdList.Item>
              )}
            />
          </List>
        </Col>
      </Row>
    </Show>
  );
};

const imageStyle: CSSProperties = {
  width: "100%",
};
