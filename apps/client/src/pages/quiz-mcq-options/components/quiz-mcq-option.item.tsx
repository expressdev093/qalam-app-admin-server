import { DeleteButton, EditButton } from "@refinedev/antd";
import { BaseKey } from "@refinedev/core";
import { Checkbox, Descriptions, Space } from "antd";
import { IQuizMcqOption } from "../../../interfaces";
import React from "react";

interface IProps {
  quizMcqOption: IQuizMcqOption;
  onEditShow: (id?: BaseKey | undefined) => void;
  onRemoveSuccess?: (mcqOption: IQuizMcqOption) => void;
}

export const QuizMcqOptionItem: React.FC<IProps> = ({
  quizMcqOption,
  onEditShow,
  onRemoveSuccess,
}) => {
  return (
    <p>
      <Space>
        <Space>
          <EditButton
            hideText
            size="small"
            onClick={() => onEditShow(quizMcqOption.id)}
          />
          <DeleteButton
            hideText
            size="small"
            recordItemId={quizMcqOption.id}
            resource="quiz-mcqoptions"
            onSuccess={(value) => onRemoveSuccess?.(quizMcqOption)}
          />
        </Space>
        <Checkbox disabled checked={quizMcqOption.isCorrect}>
          {quizMcqOption.text}
        </Checkbox>
      </Space>
      {quizMcqOption.isCorrect && (
        <Descriptions>
          <Descriptions.Item label="Detail Answer">
            {quizMcqOption.detailAnswer}
          </Descriptions.Item>
        </Descriptions>
      )}
    </p>
  );
};
