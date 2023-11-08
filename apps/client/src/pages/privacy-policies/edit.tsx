import { Edit, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Checkbox, Form } from "antd";
import { useCrudSocketClient } from "../../common/hooks";
import Editor from "../../components/editor";
import { IPrivacyPolicy } from "../../interfaces";

export const PrivacyPolicyEdit: React.FC<IResourceComponentsProps> = () => {
  const { sendUpdateEvent } = useCrudSocketClient<IPrivacyPolicy>({
    resource: "privacy-policy",
  });
  const { formProps, saveButtonProps, queryResult } = useForm<IPrivacyPolicy>({
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
