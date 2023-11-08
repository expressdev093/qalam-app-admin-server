import React, { useEffect, useState } from "react";
import { HttpError, IResourceComponentsProps, useOne } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Checkbox, Form, Input, Select, SelectProps } from "antd";
import Editor from "../../components/editor";
import { QuizType } from "../../interfaces/enum";
import { IChapter, IQuiz, ISubject, ITopic } from "../../interfaces";
import { useCrudSocketClient } from "../../common/hooks";

export const QuizEdit: React.FC<IResourceComponentsProps> = () => {
  const { sendUpdateEvent } = useCrudSocketClient<IQuiz>({
    resource: "quizes",
  });
  const [quizType, setQuizType] = useState<QuizType>();
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>();
  const [selectedChapterId, setSelectedChapterId] = useState<number>();
  const { form, formProps, saveButtonProps, queryResult, onFinish } = useForm<
    IQuiz,
    HttpError,
    IQuiz
  >({
    redirect: false,
    onMutationSuccess(data, variables, context) {
      sendUpdateEvent(data.data);
    },
  });

  const quizesData = queryResult?.data?.data;

  useEffect(() => {
    if (quizesData) {
      setQuizType(quizesData.type);
    }
  }, [quizesData]);

  const { data: singleTopicData } = useOne<ITopic>({
    resource: "topics",
    id: quizesData?.entityId!,
    queryOptions: {
      enabled: quizesData?.type === QuizType.Topic,
    },
  });

  const { data: singleChapterData } = useOne<ITopic>({
    resource: "chapters",
    id: quizesData?.entityId!,
    queryOptions: {
      enabled: quizesData?.type === QuizType.Chapter,
    },
  });

  const { selectProps: subjectSelectProps } = useSelect<ISubject>({
    resource: "subjects",
    optionLabel: "name",
    optionValue: "id",
    onSearch: () => [],
  });

  useEffect(() => {
    const topic = singleTopicData?.data;
    if (topic) {
      setSelectedSubjectId(topic.chapter?.subjectId);
      form?.setFieldValue("subjectId", topic.chapter?.subjectId);

      setSelectedChapterId(topic.chapterId);
      form?.setFieldValue("chapterId", topic.chapterId);
    }
  }, [singleTopicData]);

  useEffect(() => {
    const chapter = singleChapterData?.data;
    if (chapter) {
      setSelectedSubjectId(chapter.subjectId);
      form?.setFieldValue("subjectId", chapter.subjectId);
    }
  }, [singleChapterData]);

  const { selectProps: chapterSelectProps } = useSelect<IChapter>({
    resource: "chapters",
    optionLabel: "name",
    optionValue: "id",
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

  const { selectProps: topicSelectProps } = useSelect<ITopic>({
    resource: "topics",
    optionLabel: "name",
    optionValue: "id",
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

  const entityIdSelectProps =
    quizType === QuizType.Subject
      ? subjectSelectProps
      : quizType === QuizType.Chapter
      ? chapterSelectProps
      : topicSelectProps;

  const getPlaceholerByQuizType = () => {
    if (quizType === QuizType.Exercise) return "Select exercise";

    if (quizType === QuizType.Subject) return "Select Subject";

    if (quizType === QuizType.Chapter) return "Select Chapter";

    if (quizType === QuizType.Topic) return "Select Topic";

    return "";
  };

  useEffect(() => {
    if (quizType === QuizType.General) form?.setFieldValue("entityId", null);
  }, [quizType]);

  const onFinishSubmit = async ({ subjectId, chapterId, ...values }: any) => {
    await onFinish(values);
    form?.resetFields();
    setSelectedSubjectId(undefined);
    setSelectedChapterId(undefined);
  };

  const isSubjectHidden =
    quizType === QuizType.Subject || quizType === QuizType.General;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onFinishSubmit}>
        <Form.Item
          label="Type"
          name={["type"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                value: QuizType.General.toString(),
                label: "General",
              },
              {
                value: QuizType.Subject.toString(),
                label: "Subject",
              },
              {
                value: QuizType.Chapter.toString(),
                label: "Chapter",
              },
              {
                value: QuizType.Topic.toString(),
                label: "Topic",
              },
            ]}
            onChange={(value) => setQuizType(value)}
          />
        </Form.Item>
        <Form.Item
          label={"Subject"}
          name={"subjectId"}
          hidden={isSubjectHidden}
        >
          <Select
            {...subjectSelectProps}
            placeholder={"Select Subject"}
            onSelect={(value) => {
              setSelectedSubjectId(parseInt(value as any));
            }}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          label={"Chapter"}
          name={"chapterId"}
          hidden={quizType !== QuizType.Topic}
        >
          <Select
            {...chapterSelectProps}
            placeholder={"Select Chapter"}
            onSelect={(value) => {
              setSelectedChapterId(parseInt(value as any));
            }}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          label={quizType}
          name={"entityId"}
          hidden={quizType === QuizType.General}
        >
          <Select
            {...entityIdSelectProps}
            placeholder={getPlaceholerByQuizType()}
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>
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
          label="Passing Score"
          name={["passingScore"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Total Time in minutes"
          name={["totalTime"]}
          rules={[
            {
              required: true,
              min: 1,
            },
          ]}
        >
          <Input type="number" min={1} />
        </Form.Item>
        <Form.Item valuePropName="checked" name={["isActive"]}>
          <Checkbox>Is Active</Checkbox>
        </Form.Item>
      </Form>
    </Edit>
  );
};
