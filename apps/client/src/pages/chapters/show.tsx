import { PlusOutlined } from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  List,
  Show,
  ShowButton,
  useModalForm,
} from "@refinedev/antd";

import {
  Button,
  Card,
  Col,
  Image,
  Row,
  Space,
  Typography,
  List as AntdList,
} from "antd";
import { Utils } from "../../common/utils";
import { IChapter, IExercise, ITopic } from "../../interfaces";
import React, { CSSProperties, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCalendar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import ExerciseCreateModal from "./../exercises/modals/create.modal";
import ExerciseItem from "../exercises/component/exercise.item";
import { useExerciseList } from "./../exercises";
import { useTopicList } from "./../topics";
import { useCrudSocketClient } from "../../common/hooks";
import {
  CreateResponse,
  HttpError,
  IResourceComponents,
  UpdateResponse,
  useParsed,
  useShow,
} from "@refinedev/core";

const { Title, Paragraph } = Typography;

export const ChapterShow: React.FC<IResourceComponents> = () => {
  const [chapter, setChapter] = useState<IChapter>();
  const { id } = useParsed();
  //const { id } = useParams();
  const { exercises, setExercises } = useExerciseList([
    {
      field: "chapterId",
      operator: "eq",
      value: id,
    },
  ]);
  const { queryResult } = useShow<IChapter>();
  const queryResultData = queryResult?.data?.data;

  useCrudSocketClient<IChapter>({
    resource: "chapters",
    onUpdated(data) {
      setChapter(data);
    },
  });

  const { sendCreateEvent, sendUpdateEvent, sendRemoveEvent } =
    useCrudSocketClient<IExercise>({
      resource: "exercises",
      onUpdated(data) {
        setExercises(
          exercises.map((e: IExercise) => (e.id === data.id ? data : e))
        );
      },
      onCreated(data) {
        setExercises([...exercises, data]);
      },
      onRemoved(data) {
        setExercises(exercises.filter((e: IExercise) => e.id !== data.id));
      },
    });

  const { topics, setTopics } = useTopicList([
    {
      field: "chapterId",
      operator: "eq",
      value: id,
    },
  ]);

  const topicCrudClient = useCrudSocketClient<ITopic>({
    resource: "topics",
    onCreated(data) {
      setTopics([...topics, data]);
    },
    onRemoved(data) {
      setTopics(topics.filter((topic: ITopic) => topic.id !== data.id));
    },
    onUpdated(data) {
      setTopics(
        topics.map((topic: ITopic) => (topic.id === data.id ? data : topic))
      );
    },
  });

  const createExerciseModal = useModalForm<IExercise, HttpError, IExercise>({
    action: "create",
    resource: "exercises",
    onMutationSuccess(
      data: CreateResponse<IExercise>,
      variables: IExercise,
      context: any
    ) {
      sendCreateEvent(data.data);
    },
  });

  const editExerciseModal = useModalForm<IExercise, HttpError, IExercise>({
    action: "edit",
    resource: "exercises",
    onMutationSuccess(
      data: UpdateResponse<IExercise>,
      variables: IExercise,
      context: any
    ) {
      sendUpdateEvent(data.data);
    },
  });

  useEffect(() => {
    if (queryResultData) {
      setChapter(queryResultData);
    }
  }, [queryResultData]);

  return (
    <Show
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button
            icon={<PlusOutlined />}
            onClick={() => createExerciseModal.show()}
          >
            Add Exercise
          </Button>
        </>
      )}
    >
      <Row gutter={[16, 16]}>
        <Col xxl={8} xl={12} md={24} sm={24} xs={24}>
          <div style={{ width: "100%" }}>
            {chapter?.image && (
              <Image
                preview={false}
                src={Utils.getFullUrl(chapter?.image)}
                style={imageStyle}
                height={400}
                crossOrigin="anonymous"
              />
            )}
          </div>
          <Title>{chapter?.name}</Title>
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
                {chapter?.subject?.name}
              </Space>

              <Space>
                <FontAwesomeIcon icon={faCalendar} />
                Posted On: {moment(chapter?.createdAt).format("MMM DD , YYYY")}
              </Space>
            </div>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <div
              dangerouslySetInnerHTML={{
                __html: chapter?.description ?? "",
              }}
            ></div>
          </Card>
        </Col>
        <Col xxl={8} xl={12} md={24} sm={24} xs={24}>
          <List resource="topics" breadcrumb={null}>
            <AntdList
              bordered
              dataSource={topics}
              renderItem={(item: ITopic) => (
                <AntdList.Item key={item.id}>
                  <AntdList.Item.Meta description={item.name} />
                  <Space>
                    <ShowButton
                      resource="topics"
                      size="small"
                      hideText
                      recordItemId={item.id}
                    />
                    <EditButton
                      resource="topics"
                      size="small"
                      hideText
                      recordItemId={item.id}
                    />
                    <DeleteButton
                      resource="topics"
                      size="small"
                      hideText
                      recordItemId={item.id}
                      onSuccess={(value) =>
                        topicCrudClient.sendRemoveEvent(item)
                      }
                    />
                  </Space>
                </AntdList.Item>
              )}
            />
          </List>
        </Col>
        <Col xxl={8} xl={24} md={24} sm={24} xs={24}>
          {exercises?.map((exercise: IExercise) => (
            <ExerciseItem
              exercise={exercise}
              key={exercise.id}
              onEditShow={editExerciseModal.show}
              onRemoveSuccess={(exercise) => sendRemoveEvent(exercise)}
            />
          ))}

          <ExerciseCreateModal
            chapterId={parseInt("" + id)}
            createFormProps={createExerciseModal.formProps}
            createModalProps={createExerciseModal.modalProps}
          />

          <ExerciseCreateModal
            chapterId={parseInt("" + id)}
            createFormProps={editExerciseModal.formProps}
            createModalProps={editExerciseModal.modalProps}
          />
        </Col>
      </Row>
    </Show>
  );
};

const imageStyle: CSSProperties = {
  width: "100%",
};
