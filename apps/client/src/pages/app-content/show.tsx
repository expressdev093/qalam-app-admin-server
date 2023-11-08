import { IResourceComponentsProps, useShow } from "@refinedev/core";

import React from "react";
import { Show } from "@refinedev/antd";
export const AppContentShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <div
        dangerouslySetInnerHTML={{
          __html: record?.description ?? "",
        }}
      ></div>
    </Show>
  );
};
