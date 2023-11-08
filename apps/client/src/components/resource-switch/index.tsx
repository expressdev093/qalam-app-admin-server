import { useUpdate } from "@refinedev/core";
import { Switch, SwitchProps } from "antd";
import React from "react";

type IProps = {
  name: string;
  resource: string;
  recordId: number;
  onUpdate?: (data: any) => void;
} & SwitchProps;

export const ResourceSwitch: React.FC<IProps> = ({
  recordId,
  resource,
  name,
  onUpdate,
  ...rest
}) => {
  const { mutate } = useUpdate();

  const onChange = () => {
    const values = {
      [name]: !rest.checked,
    };

    console.log(values);
    mutate(
      {
        resource,
        id: recordId,
        values: values,
      },
      {
        onSuccess(data, variables, context) {
          onUpdate?.(data.data);
        },
      }
    );
  };
  return <Switch {...rest} onClick={onChange} />;
};
