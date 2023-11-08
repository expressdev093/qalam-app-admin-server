import { EditOutlined } from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  TagField,
  useModalForm,
} from "@refinedev/antd";
import { BaseKey } from "@refinedev/core";
import { Collapse, Space, Typography } from "antd";
import { IQuestion } from "../../../interfaces";
import React from "react";

type IProps = {
  question: IQuestion;
  onEditShow: (id?: BaseKey | undefined) => void;
  onRemoveSuccess?: (question: IQuestion) => void;
};

export const QuestionItem: React.FC<IProps> = ({
  question,
  onEditShow,
  onRemoveSuccess,
}) => {
  return (
    <Collapse style={{ marginBottom: 10 }} size="small">
      <Collapse.Panel
        header={
          <Space>
            <TagField value={question.type} color="green" />
            <Typography.Text>{question.text}</Typography.Text>
          </Space>
        }
        key={question.id}
        extra={
          <Space>
            <EditButton
              hideText
              size="small"
              recordItemId={question.id}
              resource="questions"
              icon={<EditOutlined />}
              onClick={() => onEditShow(question.id)}
            />
            <DeleteButton
              hideText
              recordItemId={question.id}
              size="small"
              resource="questions"
              onSuccess={(value) => onRemoveSuccess?.(question)}
            />
          </Space>
        }
      >
        <p
          dangerouslySetInnerHTML={{
            __html: question.answer,
          }}
        ></p>
      </Collapse.Panel>
    </Collapse>
  );
};
