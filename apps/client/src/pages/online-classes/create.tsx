import React, { useState } from "react";
import { HttpError, IResourceComponentsProps, useList } from "@refinedev/core";
import { Create, useForm, useModalForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Checkbox, Select, Row, Col } from "antd";
import dayjs from "dayjs";
import {
  IChapter,
  IOnlineClass,
  ISubject,
  ITopic,
  ITopicVideo,
} from "../../interfaces";
import Editor from "../../components/editor";
import { useCrudSocketClient } from "../../common/hooks";
import TopicVideoListPlayerComponent from "../topic-videos/components/topic-video-list-player.component";
import { TopicVideoCreateModal, useTopicVideoList } from "../topic-videos";

export const OnlineClassCreate: React.FC<IResourceComponentsProps> = () => {
  const { sendCreateEvent } = useCrudSocketClient<IOnlineClass>({
    resource: "online-classes",
  });
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>();
  const [selectedChapterId, setSelectedChapterId] = useState<number>();
  const [selectedTopicId, setSelectedTopicId] = useState<number>();
  const { formProps, saveButtonProps, queryResult } = useForm<
    IOnlineClass,
    HttpError,
    IOnlineClass
  >({
    onMutationSuccess(data, variables, context) {
      sendCreateEvent(data.data);
    },
  });

  const { selectProps: topicSelectProps } = useSelect<ITopic>({
    resource: "topics",
    optionLabel: "name",
    queryOptions: {
      enabled: selectedChapterId !== undefined,
    },
    filters: [
      {
        field: "chapterId",
        operator: "eq",
        value: selectedChapterId,
      },
    ],
    onSearch: () => [],
  });

  const { selectProps: chapterSelectProps } = useSelect<IChapter>({
    resource: "chapters",
    optionLabel: "name",
    queryOptions: {
      enabled: selectedSubjectId !== undefined,
    },
    filters: [
      {
        field: "subjectId",
        operator: "eq",
        value: selectedSubjectId,
      },
    ],
    onSearch: () => [],
  });

  const { selectProps: subjectSelectProps } = useSelect<ISubject>({
    resource: "subjects",
    optionLabel: "name",
    onSearch: () => [],
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
        value: selectedTopicId,
      },
    ],
    {
      pagination: {
        mode: "off",
      },
      queryOptions: {
        enabled: selectedTopicId !== undefined,
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

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{ isEnded: false, isActive: true }}
      >
        <Form.Item
          label="Subject"
          name={"subjectId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...subjectSelectProps}
            placeholder="Select Subject"
            filterOption={true}
            optionFilterProp="label"
            onSelect={(value) => {
              setSelectedSubjectId(parseInt(value as any));
              setVideos([]);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Chapter"
          name={"chapterId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...chapterSelectProps}
            placeholder="Select Chapter"
            onSelect={(value) => {
              setSelectedChapterId(parseInt(value as any));
            }}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          label="Topic"
          name={"topicId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...topicSelectProps}
            placeholder="Select Topic"
            onSelect={(value) => {
              setSelectedTopicId(parseInt(value as any));
            }}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>

        {selectedTopicId && (
          <TopicVideoListPlayerComponent
            videos={videos}
            title={"Title"}
            isLoading={false}
            onEditShow={editTopicVideoModal.show}
            onAddVideoClick={() => createTopicVideoModal.show()}
          />
        )}

        <Form.Item
          label="Title"
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Editor
          label="Description"
          name={["description"]}
          rules={[
            {
              required: true,
            },
          ]}
        />
        <Form.Item
          label="Start date & time"
          name={["startDate"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker showTime use12Hours />
        </Form.Item>
        <Form.Item
          label="End date & time"
          name={["endDate"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker showTime use12Hours />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          name={["isEnded"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>Is Ended</Checkbox>
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          name={["isActive"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>Is Active</Checkbox>
        </Form.Item>
      </Form>

      <TopicVideoCreateModal
        topicId={parseInt("" + selectedTopicId)}
        createFormProps={createTopicVideoModal.formProps}
        createModalProps={createTopicVideoModal.modalProps}
      />
      <TopicVideoCreateModal
        topicId={parseInt("" + selectedTopicId)}
        createFormProps={editTopicVideoModal.formProps}
        createModalProps={editTopicVideoModal.modalProps}
      />
    </Create>
  );
};
