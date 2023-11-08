import React, { useEffect, useState } from "react";
import { HttpError, IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, useModalForm } from "@refinedev/antd";
import { Typography, Row, Col, Card, Space, Button } from "antd";
import { IQuiz, IQuizMcq } from "../../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faList, faCalendar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
import { QuizMcqItem, QuizMcqModal, useQuizMcqList } from "../quiz-mcqs";
import { useCrudSocketClient } from "../../common/hooks";
import { useParams } from "react-router-dom";

const { Title } = Typography;

export const QuizShow: React.FC<IResourceComponentsProps> = () => {
  const { id } = useParams();
  const quizId = parseInt("" + id);
  const [quiz, setQuiz] = useState<IQuiz>();
  const { queryResult } = useShow<IQuiz>();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  useEffect(() => {
    if (record) {
      setQuiz(record);
    }
  }, [record]);

  const {
    quizMcqs,
    setQuizMcqs,
    isLoading: quizMcqLoading,
  } = useQuizMcqList([
    {
      field: "quizId",
      operator: "eq",
      value: quizId,
    },
  ]);

  console.log(quizMcqs);

  const quizMcqsCrudClient = useCrudSocketClient<IQuizMcq>({
    resource: "quiz-mcqs",
    onCreated(data) {
      setQuizMcqs([...quizMcqs, data]);
    },
    onRemoved(data) {
      setQuizMcqs(quizMcqs.filter((m) => m.id !== data.id));
    },
    onUpdated(data) {
      setQuizMcqs(quizMcqs.map((m) => (m.id === data.id ? data : m)));
    },
  });

  const createQuizMCQModal = useModalForm<IQuizMcq, HttpError, IQuizMcq>({
    action: "create",
    resource: "quiz-mcqs",
    onMutationSuccess(data, variables, context) {
      quizMcqsCrudClient.sendCreateEvent(data.data);
    },
  });

  const editQuizMCQModal = useModalForm<IQuizMcq, HttpError, IQuizMcq>({
    action: "edit",
    resource: "quiz-mcqs",
    onMutationSuccess(data, variables, context) {
      quizMcqsCrudClient.sendUpdateEvent(data.data);
    },
  });

  return (
    <Show
      isLoading={isLoading}
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}{" "}
          <Button
            icon={<PlusOutlined />}
            onClick={() => createQuizMCQModal.show()}
          >
            Add MCQ
          </Button>
        </>
      )}
    >
      <Row gutter={[16, 16]}>
        <Col xxl={12} xl={24} md={24} sm={24} xs={24}>
          <Title>{quiz?.title}</Title>
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Space>
                <FontAwesomeIcon icon={faBook} /> QuizType: {quiz?.type}
              </Space>

              <Space>
                <FontAwesomeIcon icon={faCalendar} />
                Posted On: {moment(quiz?.createdAt).format("MMM DD , YYYY")}
              </Space>
            </div>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <p
              dangerouslySetInnerHTML={{
                __html: quiz?.description ?? "",
              }}
            ></p>
          </Card>
        </Col>

        <Col xxl={12} xl={24} md={24} sm={24} xs={24}>
          {quizMcqs?.map((mcq) => (
            <QuizMcqItem
              quizMcq={mcq}
              key={mcq.id}
              onEditShow={editQuizMCQModal.show}
              onRemoveSuccess={(quizMcq) =>
                quizMcqsCrudClient.sendRemoveEvent(quizMcq)
              }
            />
          ))}

          <QuizMcqModal
            quizId={quizId}
            createFormProps={createQuizMCQModal.formProps}
            createModalProps={createQuizMCQModal.modalProps}
          />

          <QuizMcqModal
            quizId={quizId}
            createFormProps={editQuizMCQModal.formProps}
            createModalProps={editQuizMCQModal.modalProps}
          />
        </Col>
      </Row>
    </Show>
  );
};
