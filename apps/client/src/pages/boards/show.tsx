import React from "react";

import {
  Show,
  NumberField,
  DateField,
  TextField,
  BooleanField,
} from "@refinedev/antd";
import { Typography } from "antd";
import { useShow } from "@refinedev/core";

const { Title } = Typography;

export const BoardsShow: React.FC = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>Created At</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>Updated At</Title>
      <DateField value={record?.updatedAt} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Is Active</Title>
      <BooleanField value={record?.isActive} />
    </Show>
  );
};
