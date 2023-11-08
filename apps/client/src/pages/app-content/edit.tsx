import { Edit, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Checkbox, Form, Input } from "antd";
import { useCrudSocketClient } from "../../common/hooks";
import Editor from "../../components/editor";
import { ISupport } from "../../interfaces";

export const AppContentEdit: React.FC<IResourceComponentsProps> = () => {
  const { sendUpdateEvent } = useCrudSocketClient<ISupport>({
    resource: "supports",
  });
  const { formProps, saveButtonProps, queryResult } = useForm<ISupport>({
    redirect: false,
    onMutationSuccess(data, variables, context) {
      sendUpdateEvent(data.data);
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Editor label="Description" name={["description"]} />
        <Form.Item valuePropName="checked" name={["isActive"]}>
          <Checkbox>Is Active</Checkbox>
        </Form.Item>
      </Form>
    </Edit>
  );
};
