import { PlusOutlined } from "@ant-design/icons";
import { DeleteButton, EditButton, useModalForm } from "@refinedev/antd";
import { BaseKey, HttpError } from "@refinedev/core";
import { Button, Collapse, Space } from "antd";
import { useCrudSocketClient } from "../../../common/hooks";
import { IQuizMcq, IQuizMcqOption } from "../../../interfaces";
import {
  QuizMcqOptionItem,
  QuizMcqOptionModal,
  useQuizMcqOptionList,
} from "../../quiz-mcq-options";

interface IProps {
  quizMcq: IQuizMcq;
  onEditShow: (id?: BaseKey | undefined) => void;
  onRemoveSuccess?: (mcq: IQuizMcq) => void;
}

export const QuizMcqItem: React.FC<IProps> = ({
  quizMcq,
  onEditShow,
  onRemoveSuccess,
}) => {
  const { quizMcqOptions, setQuizMcqOptions } = useQuizMcqOptionList([
    {
      field: "quizMcqId",
      operator: "eq",
      value: quizMcq.id,
    },
  ]);

  const { sendCreateEvent, sendRemoveEvent, sendUpdateEvent } =
    useCrudSocketClient<IQuizMcqOption>({
      resource: "mcq-options",
      onCreated(data) {
        setQuizMcqOptions([...quizMcqOptions, data]);
      },
      onRemoved(data) {
        setQuizMcqOptions(quizMcqOptions.filter((m) => m.id !== data.id));
      },
      onUpdated(data) {
        setQuizMcqOptions(
          quizMcqOptions.map((m) => (m.id === data.id ? data : m))
        );
      },
    });

  const createQuizMcqOptionModal = useModalForm<
    IQuizMcqOption,
    HttpError,
    IQuizMcqOption
  >({
    action: "create",
    resource: "quiz-mcqoptions",
    onMutationSuccess(data, variables, context) {
      sendCreateEvent(data.data);
    },
  });

  const editQuizMcqOptionModal = useModalForm<
    IQuizMcqOption,
    HttpError,
    IQuizMcqOption
  >({
    action: "edit",
    resource: "quiz-mcqoptions",
    onMutationSuccess(data, variables, context) {
      sendUpdateEvent(data.data);
    },
  });

  return (
    <>
      <Collapse style={{ marginBottom: 10 }} size="small">
        <Collapse.Panel
          header={quizMcq.text}
          key={quizMcq.id}
          extra={
            <Space>
              <Button
                icon={<PlusOutlined />}
                size="small"
                onClick={() => {
                  createQuizMcqOptionModal.show();
                }}
              >
                Add Option
              </Button>
              <EditButton
                hideText
                size="small"
                onClick={() => onEditShow(quizMcq.id)}
              />
              <DeleteButton
                hideText
                recordItemId={quizMcq.id}
                size="small"
                resource="quiz-mcqs"
                onSuccess={(value) => onRemoveSuccess?.(quizMcq)}
              />
            </Space>
          }
        >
          {quizMcqOptions.map((mcqOption) => (
            <QuizMcqOptionItem
              key={mcqOption.id}
              quizMcqOption={mcqOption}
              onEditShow={editQuizMcqOptionModal.show}
              onRemoveSuccess={(mcqOption) => sendRemoveEvent(mcqOption)}
            />
          ))}
        </Collapse.Panel>
      </Collapse>
      <QuizMcqOptionModal
        quizMcqId={quizMcq.id}
        createFormProps={createQuizMcqOptionModal.formProps}
        createModalProps={createQuizMcqOptionModal.modalProps}
      />

      <QuizMcqOptionModal
        quizMcqId={quizMcq.id}
        createFormProps={editQuizMcqOptionModal.formProps}
        createModalProps={editQuizMcqOptionModal.modalProps}
      />
    </>
  );
};
