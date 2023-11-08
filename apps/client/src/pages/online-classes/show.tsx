import React, { useState, useEffect } from "react";
import {
  IResourceComponentsProps,
  useShow,
  useOne,
  HttpError,
} from "@refinedev/core";
import { Show, TagField, useModalForm } from "@refinedev/antd";
import { Card, Col, Row, Space, Typography } from "antd";
import {
  IChapter,
  IOnlineClass,
  ISubject,
  ITopic,
  ITopicVideo,
} from "../../interfaces";
import { useCrudSocketClient } from "../../common/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faList, faCalendar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { TopicVideoCreateModal, useTopicVideoList } from "../topic-videos";
import TopicVideoListPlayerComponent from "../topic-videos/components/topic-video-list-player.component";

const { Title } = Typography;

export const OnlineClassShow: React.FC<IResourceComponentsProps> = () => {
  const [onlineClass, setOnlineClass] = useState<IOnlineClass>();
  const { queryResult } = useShow<IOnlineClass, HttpError>();

  useCrudSocketClient<IOnlineClass>({
    resource: "online-class",
    onUpdated(data) {
      setOnlineClass(data);
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: topicData, isLoading: topicIsLoading } = useOne<ITopic>({
    resource: "topics",
    id: record?.topicId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: chapterData, isLoading: chapterIsLoading } = useOne<IChapter>({
    resource: "chapters",
    id: record?.chapterId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: subjectData, isLoading: subjectIsLoading } = useOne<ISubject>({
    resource: "subjects",
    id: record?.subjectId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const {
    videos,
    setVideos,
    isLoading: videoLoading,
  } = useTopicVideoList(
    [
      {
        field: "topicId",
        operator: "eq",
        value: record?.topicId,
      },
    ],
    {
      pagination: {
        mode: "off",
      },
      queryOptions: {
        enabled: record?.topicId !== undefined,
      },
    }
  );

  const createTopicVideoModal = useModalForm<
    ITopicVideo,
    HttpError,
    ITopicVideo
  >({
    resource: "topic-videos",
    action: "create",
    onMutationSuccess(data, variables, context) {
      //topicVideoCrudClient.sendCreateEvent(data.data);
    },
  });

  const editTopicVideoModal = useModalForm<ITopicVideo, HttpError, ITopicVideo>(
    {
      resource: "topic-videos",
      action: "edit",
      onMutationSuccess(data, variables, context) {
        // topicVideoCrudClient.sendUpdateEvent(data.data);
      },
    }
  );

  useEffect(() => {
    if (record) {
      setOnlineClass(record);
    }
  }, [record]);

  return (
    <Show isLoading={isLoading}>
      <Row gutter={[16, 16]}>
        <Col xl={12} md={24} sm={24} xs={24}>
          <Title>{record?.title}</Title>
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Row>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Space>
                    <FontAwesomeIcon icon={faBook} /> Subject:{" "}
                    {subjectData?.data.name}
                  </Space>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Space>
                    <FontAwesomeIcon icon={faList} /> Chapter:{" "}
                    {chapterData?.data?.name}
                  </Space>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Space>
                    <FontAwesomeIcon icon={faCalendar} />
                    Start On:{" "}
                    <TagField
                      value={moment(record?.startDate).format(
                        "MMM DD , YYYY hh:mm A"
                      )}
                      color="green"
                    />
                  </Space>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Space>
                    <FontAwesomeIcon icon={faCalendar} />
                    End On:{" "}
                    <TagField
                      value={moment(record?.endDate).format(
                        "MMM DD , YYYY hh:mm A"
                      )}
                      color="red"
                    />
                  </Space>
                </Col>
              </Row>
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
          <TopicVideoListPlayerComponent
            videos={videos}
            title={topicData?.data?.name ?? ""}
            isLoading={false}
            onAddVideoClick={() => createTopicVideoModal.show()}
            onEditShow={editTopicVideoModal.show}
          />
        </Col>
      </Row>

      <TopicVideoCreateModal
        topicId={parseInt("" + onlineClass?.topicId)}
        createFormProps={createTopicVideoModal.formProps}
        createModalProps={createTopicVideoModal.modalProps}
      />
      <TopicVideoCreateModal
        topicId={parseInt("" + onlineClass?.topicId)}
        createFormProps={editTopicVideoModal.formProps}
        createModalProps={editTopicVideoModal.modalProps}
      />
    </Show>
  );
};
