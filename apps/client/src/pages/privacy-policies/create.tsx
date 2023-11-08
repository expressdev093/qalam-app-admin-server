import { Create, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Checkbox, Form } from "antd";
import { useCrudSocketClient } from "../../common/hooks";
import Editor from "../../components/editor";
import { IPrivacyPolicy } from "../../interfaces";

export const PrivacyPolicyCreate: React.FC<IResourceComponentsProps> = () => {
  const { sendCreateEvent } = useCrudSocketClient<IPrivacyPolicy>({
    resource: "privacy-policy",
  });
  const { form, formProps, saveButtonProps, queryResult } =
    useForm<IPrivacyPolicy>({
      redirect: false,
      onMutationSuccess(data, variables, context) {
        sendCreateEvent(data.data);
        form?.resetFields();
      },
    });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" initialValues={{ isActive: true }}>
        <Editor label="Description" name={["description"]} />
        <Form.Item valuePropName="checked" name={["isActive"]}>
          <Checkbox>Is Active</Checkbox>
        </Form.Item>
      </Form>
    </Create>
  );
};
