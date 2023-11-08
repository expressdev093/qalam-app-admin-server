import { PlusOutlined } from "@ant-design/icons";
import { DeleteButton, EditButton, useModalForm } from "@refinedev/antd";
import { BaseKey, HttpError } from "@refinedev/core";
import { Button, Card, Empty, Space, Typography } from "antd";
import { useCrudSocketClient } from "../../../common/hooks";
import { IExercise, IMcq, IQuestion } from "../../../interfaces";
import { McqCreateModal, McqItem, useMcqList } from "../../mcqs";
import {
  QuestionCreateModal,
  QuestionItem,
  useQuestionList,
} from "../../questions";
import React from "react";

type IProps = {
  exercise: IExercise;
  onEditShow: (id?: BaseKey | undefined) => void;
  onRemoveSuccess?: (exercise: IExercise) => void;
};

const ExerciseItem: React.FC<IProps> = ({
  exercise,
  onEditShow,
  onRemoveSuccess,
}) => {
  const {
    questions,
    setQuestions,
    isLoading: questionLoading,
  } = useQuestionList([
    {
      field: "exerciseId",
      operator: "eq",
      value: exercise.id,
    },
  ]);

  const {
    mcqs,
    setMcqs,
    isLoading: mcqLoading,
  } = useMcqList([
    {
      field: "exerciseId",
      operator: "eq",
      value: exercise.id,
    },
  ]);

  const questionCrudClient = useCrudSocketClient<IQuestion>({
    resource: "questions",
    onCreated(data) {
      setQuestions([...questions, data]);
    },
    onRemoved(data) {
      setQuestions(questions.filter((q) => q.id !== data.id));
    },
    onUpdated(data) {
      setQuestions(questions.map((q) => (q.id === data.id ? data : q)));
    },
  });

  const mcqsCrudClient = useCrudSocketClient<IMcq>({
    resource: "mcqs",
    onCreated(data) {
      setMcqs([...mcqs, data]);
    },
    onRemoved(data) {
      setMcqs(mcqs.filter((m) => m.id !== data.id));
    },
    onUpdated(data) {
      setMcqs(mcqs.map((m) => (m.id === data.id ? data : m)));
    },
  });

  const createQuestionModal = useModalForm<IQuestion, HttpError, IQuestion>({
    action: "create",
    resource: "questions",
    onMutationSuccess(data, variables, context) {
      questionCrudClient.sendCreateEvent(data.data);
    },
  });

  const editQuestionModal = useModalForm<IQuestion, HttpError, IQuestion>({
    action: "edit",
    resource: "questions",
    onMutationSuccess(data, variables, context) {
      questionCrudClient.sendUpdateEvent(data.data);
    },
  });

  const createMCQModal = useModalForm<IMcq, HttpError, IMcq>({
    action: "create",
    resource: "mcqs",
    onMutationSuccess(data, variables, context) {
      mcqsCrudClient.sendCreateEvent(data.data);
    },
  });

  const editMCQModal = useModalForm<IMcq, HttpError, IMcq>({
    action: "edit",
    resource: "mcqs",
    onMutationSuccess(data, variables, context) {
      mcqsCrudClient.sendUpdateEvent(data.data);
    },
  });

  return (
    <>
      <Card
        loading={questionLoading || mcqLoading}
        key={exercise.id}
        title={exercise.title}
        style={{ marginBottom: 10 }}
        extra={
          <Space>
            <Button
              size="small"
              icon={<PlusOutlined />}
              onClick={() => createMCQModal.show()}
            >
              Add MCQS
            </Button>
            <Button
              size="small"
              icon={<PlusOutlined />}
              onClick={() => {
                createQuestionModal.show();
              }}
            >
              Add Question
            </Button>
            <EditButton
              hideText
              size="small"
              onClick={() => onEditShow(exercise.id)}
            />
            <DeleteButton
              size="small"
              resource="exercises"
              hideText
              recordItemId={exercise.id}
              onSuccess={(value) => onRemoveSuccess?.(exercise)}
            />
          </Space>
        }
      >
        <Typography.Paragraph>{exercise.description}</Typography.Paragraph>
        <Typography.Title level={3}>Questions/Short Questions</Typography.Title>
        {questions.map((question) => (
          <QuestionItem
            question={question}
            key={question.id}
            onEditShow={editQuestionModal.show}
            onRemoveSuccess={(question) =>
              questionCrudClient.sendRemoveEvent(question)
            }
          />
        ))}
        <Typography.Title level={3}>MCQS</Typography.Title>
        {mcqs.map((mcq) => (
          <McqItem
            mcq={mcq}
            key={mcq.id}
            onEditShow={editMCQModal.show}
            onRemoveSuccess={(mcq) => mcqsCrudClient.sendRemoveEvent(mcq)}
          />
        ))}
      </Card>
      <QuestionCreateModal
        exerciseId={exercise.id}
        createFormProps={createQuestionModal.formProps}
        createModalProps={createQuestionModal.modalProps}
      />
      <QuestionCreateModal
        exerciseId={exercise.id}
        createFormProps={editQuestionModal.formProps}
        createModalProps={editQuestionModal.modalProps}
      />

      <McqCreateModal
        exerciseId={exercise.id}
        createFormProps={createMCQModal.formProps}
        createModalProps={createMCQModal.modalProps}
      />

      <McqCreateModal
        exerciseId={exercise.id}
        createFormProps={editMCQModal.formProps}
        createModalProps={editMCQModal.modalProps}
      />
    </>
  );
};

export default ExerciseItem;
