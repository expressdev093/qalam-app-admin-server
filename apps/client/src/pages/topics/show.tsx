import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Card, Button } from "antd";

import { Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faList, faCalendar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { HttpError, IResourceComponentsProps, useShow } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { ITopic, ITopicVideo } from "../../interfaces";
import {
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
  Show,
  useModalForm,
} from "@refinedev/antd";
import TopicVideoListPlayerComponent from "../topic-videos/components/topic-video-list-player.component";
import { PlusOutlined } from "@ant-design/icons";
import { TopicVideoCreateModal, useTopicVideoList } from "../topic-videos";
import { ImageView } from "../../components";
import { useCrudSocketClient } from "../../common/hooks";

const { Title } = Typography;

export const TopicShow: React.FC<IResourceComponentsProps> = () => {
  const [topic, setTopic] = useState<ITopic>();
  const { id } = useParams();

  useCrudSocketClient<ITopic>({
    resource: "topics",
    onUpdated(data) {
      setTopic(data);
    },
  });

  const { queryResult } = useShow<ITopic>();
  const { data, isLoading } = queryResult;

  const queryResultData = data?.data;

  const {
    videos,
    setVideos,
    isLoading: videoLoading,
  } = useTopicVideoList([
    {
      field: "topicId",
      operator: "eq",
      value: id,
    },
  ]);

  const topicVideoCrudClient = useCrudSocketClient<ITopicVideo>({
    resource: "topic-videos",
    onCreated(data) {
      setVideos([...videos, data]);
    },
    onRemoved(data) {
      setVideos(videos.filter((c) => c.id !== data.id));
    },
    onUpdated(data) {
      setVideos(videos.map((c) => (c.id === data.id ? data : c)));
    },
  });

  const createTopicVideoModal = useModalForm<
    ITopicVideo,
    HttpError,
    ITopicVideo
  >({
    resource: "topic-videos",
    action: "create",
    onMutationSuccess(data, variables, context) {
      topicVideoCrudClient.sendCreateEvent(data.data);
    },
  });

  const editTopicVideoModal = useModalForm<ITopicVideo, HttpError, ITopicVideo>(
    {
      resource: "topic-videos",
      action: "edit",
      onMutationSuccess(data, variables, context) {
        topicVideoCrudClient.sendUpdateEvent(data.data);
      },
    }
  );

  useEffect(() => {
    if (queryResultData) setTopic(queryResultData);
  }, [queryResultData]);

  return (
    <Show
      isLoading={isLoading}
      title={topic?.name}
      headerButtons={
        <Space>
          <ListButton />
          <EditButton />
          <DeleteButton />
          <RefreshButton />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => createTopicVideoModal.show()}
          >
            Add Topic Video
          </Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]}>
        <Col xl={12} md={24} sm={24} xs={24}>
          <div style={{ width: "100%" }}>
            {topic?.image && <ImageView path={topic?.image} />}
          </div>
          <Title>{topic?.name}</Title>
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
                {topic?.chapter?.subject?.name}
              </Space>
              <Space>
                <FontAwesomeIcon icon={faList} /> Chapter:{" "}
                {topic?.chapter?.name}
              </Space>
              <Space>
                <FontAwesomeIcon icon={faCalendar} />
                Posted On: {moment(topic?.createdAt).format("MMM DD , YYYY")}
              </Space>
            </div>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <div
              dangerouslySetInnerHTML={{
                __html: topic?.description ?? "",
              }}
            ></div>
          </Card>
        </Col>
        <Col xl={12} md={24} sm={24} xs={24}>
          <TopicVideoListPlayerComponent
            videos={videos}
            title={topic?.name ?? "Title"}
            isLoading={isLoading || videoLoading}
            onEditShow={editTopicVideoModal.show}
            onRemoveSuccess={(video) =>
              topicVideoCrudClient.sendRemoveEvent(video)
            }
            onAddVideoClick={() => createTopicVideoModal.show()}
          />
        </Col>
      </Row>
      <TopicVideoCreateModal
        topicId={parseInt("" + id)}
        createFormProps={createTopicVideoModal.formProps}
        createModalProps={createTopicVideoModal.modalProps}
      />
      <TopicVideoCreateModal
        topicId={parseInt("" + id)}
        createFormProps={editTopicVideoModal.formProps}
        createModalProps={editTopicVideoModal.modalProps}
      />
    </Show>
  );
};
