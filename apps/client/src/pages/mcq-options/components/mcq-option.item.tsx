import { DeleteButton, EditButton } from "@refinedev/antd";
import { BaseKey } from "@refinedev/core";
import { Checkbox, Descriptions, Space } from "antd";
import { IMcqOption } from "../../../interfaces";
import React from "react";

interface IProps {
  mcqOption: IMcqOption;
  onEditShow: (id?: BaseKey | undefined) => void;
  onRemoveSuccess?: (mcqOption: IMcqOption) => void
}

export const McqOptionItem: React.FC<IProps> = ({ mcqOption, onEditShow , onRemoveSuccess }) => {
  return (
    <p>
      <Space>
        <Space>
          <EditButton
            hideText
            size="small"
            onClick={() => onEditShow(mcqOption.id)}
          />
          <DeleteButton
            hideText
            size="small"
            recordItemId={mcqOption.id}
            resource="mcq-options"
            onSuccess={(value) => onRemoveSuccess?.(mcqOption)}
          />
        </Space>
        <Checkbox disabled checked={mcqOption.isCorrect}>
          {mcqOption.text}
        </Checkbox>
      </Space>
      {mcqOption.isCorrect && (
        <Descriptions>
          <Descriptions.Item label="Detail Answer">{mcqOption.detailAnswer}</Descriptions.Item>
        </Descriptions>
      )}
    </p>
  );
};
