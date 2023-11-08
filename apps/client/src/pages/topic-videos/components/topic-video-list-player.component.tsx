import {
  Card,
  Col,
  Popconfirm,
  Row,
  Typography,
  Dropdown,
  Image,
  List,
  Skeleton,
  Empty,
  Button,
} from "antd";
import { ITopicVideo } from "../../../interfaces";
import React, { useEffect, useState } from "react";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useApiUrl, useDelete, BaseKey } from "@refinedev/core";
import type { MenuProps } from "antd";
import { Utils } from "../../../common/utils";

interface IProps {
  videos: ITopicVideo[];
  title: string;
  isLoading?: boolean;
  onEditShow?: (key?: BaseKey | undefined) => void;
  onRemoveSuccess?: (video: ITopicVideo) => void;
  onAddVideoClick?: () => void;
}

const { Paragraph, Title, Text } = Typography;

const TopicVideoListPlayerComponent: React.FC<IProps> = (
  { videos, isLoading, title, onEditShow, onRemoveSuccess, onAddVideoClick },
  ref
) => {
  const [currentTopicVideo, setCurrentTopicVideo] = useState<ITopicVideo>();
  const { mutate: deleteMutation } = useDelete<ITopicVideo>();

  const onDelete = (video: ITopicVideo) => {
    deleteMutation(
      {
        resource: "topic-videos",
        id: video.id,
      },
      {
        onSuccess(data, variables, context) {
          onRemoveSuccess?.(video);
        },
      }
    );
  };

  useEffect(() => {
    if (videos.length === 0) {
      setCurrentTopicVideo(undefined);
    } else {
      setCurrentTopicVideo(videos[0]);
    }
  }, [videos]);

  return (
    <Card title={title} loading={isLoading}>
      {videos.length > 0 ? (
        <Row style={{ marginTop: 10 }} gutter={[16, 16]}>
          <Col xxl={16} xl={24} md={24} sm={24} xs={24}>
            <video
              width="100%"
              src={Utils.getFullUrl(currentTopicVideo?.url)}
              crossOrigin="anonymous"
              controls
            />
            <Title level={3}>{currentTopicVideo?.title}</Title>
            <Paragraph>{currentTopicVideo?.description}</Paragraph>
          </Col>
          <Col xxl={8} xl={24} md={24} sm={24} xs={24}>
            <List
              itemLayout="horizontal"
              dataSource={videos}
              renderItem={(item) => {
                const items: MenuProps["items"] = [
                  {
                    label: "Edit",
                    key: "edit",
                    icon: <EditOutlined />,
                    onClick: () => onEditShow?.(item.id),
                  },
                  {
                    label: (
                      <Popconfirm
                        placement="bottomRight"
                        title={"Are you sure?"}
                        onConfirm={() => onDelete(item)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Text>Delete</Text>
                      </Popconfirm>
                    ),
                    key: "delete",
                    icon: <DeleteOutlined />,
                  },
                ];

                const onClick = () => {
                  setCurrentTopicVideo(item);
                };
                return (
                  <List.Item
                    key={item.id}
                    style={{
                      backgroundColor:
                        currentTopicVideo?.id === item.id
                          ? "#d9d9d9"
                          : "transparent",
                      paddingLeft: 5,
                    }}
                  >
                    <Skeleton avatar title={false} loading={isLoading} active>
                      <List.Item.Meta
                        avatar={
                          <Image
                            onClick={onClick}
                            preview={false}
                            src={Utils.getFullUrl(item.thumbnail)}
                            crossOrigin="anonymous"
                            width={100}
                          />
                        }
                        title={
                          <div
                            style={{
                              justifyContent: "space-between",
                              display: "flex",
                            }}
                          >
                            <Title
                              onClick={onClick}
                              className=".single-lines-text"
                              level={5}
                              style={{ padding: 0, margin: 0, fontSize: 13 }}
                            >
                              {item.title}
                            </Title>
                            <Dropdown
                              menu={{ items }}
                              placement="bottom"
                              trigger={["click"]}
                            >
                              <MoreOutlined />
                            </Dropdown>
                          </div>
                        }
                        description={
                          <Paragraph
                            onClick={onClick}
                            className="two-lines-text"
                            style={{ fontSize: 12 }}
                          >
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Skeleton>
                  </List.Item>
                );
              }}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={24}>
            <Empty
              imageStyle={{ height: 60 }}
              description={
                <span>
                  No video found in this topic. kindly upload video to this
                  topic to apear here.
                </span>
              }
            >
              <Button type="primary" onClick={onAddVideoClick}>
                Add Video
              </Button>
            </Empty>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default TopicVideoListPlayerComponent;
