import { Create, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Checkbox, Form, Input, Select } from "antd";
import { useCrudSocketClient } from "../../common/hooks";
import Editor from "../../components/editor";
import { IWebsiteContent } from "../../interfaces";
import { WebsiteContentType } from "../../interfaces/enum";

export const AppContentCreate: React.FC<IResourceComponentsProps> = () => {
  const { sendCreateEvent } = useCrudSocketClient<IWebsiteContent>({
    resource: "website-contents",
  });
  const { form, formProps, saveButtonProps, queryResult } =
    useForm<IWebsiteContent>({
      redirect: false,
      onMutationSuccess(data, variables, context) {
        sendCreateEvent(data.data);
        form?.resetFields();
      },
    });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" initialValues={{ isActive: true }}>
        <Form.Item
          label="Content Type"
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
                label: WebsiteContentType.About,
                value: WebsiteContentType.About,
              },
              {
                label: WebsiteContentType.PrivacyPolicy,
                value: WebsiteContentType.PrivacyPolicy,
              },
              {
                label: WebsiteContentType.Support,
                value: WebsiteContentType.Support,
              },
            ]}
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
        <Editor label="Description" name={["description"]} />
        <Form.Item valuePropName="checked" name={["isActive"]}>
          <Checkbox>Is Active</Checkbox>
        </Form.Item>
      </Form>
    </Create>
  );
};
