import { Create, useForm, useSelect } from "@refinedev/antd";
import { IResourceComponentsProps, useApiUrl } from "@refinedev/core";
import { Checkbox, Form, Input, Select, Upload } from "antd";

import { useCrudSocketClient, useFileUpload } from "../../common/hooks";
import { normalizeFile, Utils } from "../../common/utils";
import Editor from "../../components/editor";
import { IPastPaper, ISubject } from "../../interfaces";

export const PastPapersCreate: React.FC<IResourceComponentsProps> = () => {
  const { sendCreateEvent } = useCrudSocketClient<IPastPaper>({
    resource: "past-papers",
  });
  const { form, formProps, saveButtonProps, queryResult, onFinish } =
    useForm<IPastPaper>({
      redirect: false,
      onMutationSuccess(data, variables, context) {
        sendCreateEvent(data?.data);
        form.resetFields();
      },
    });
  const apiUrl = useApiUrl();

  const { onChange, onRemove } = useFileUpload();

  const { selectProps: subjectSelectProps } = useSelect<ISubject>({
    resource: "subjects",
    optionLabel: "name",
    onSearch: () => [],
  });

  const onSubmitFinish = async ({ url, ...rest }: any) => {
    const file = (url ?? []).length > 0 ? url[0] : undefined;
    const newValues: ISubject = {
      ...rest,
      url: file?.name,
    };
    const response = await onFinish(newValues);
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={onSubmitFinish}
        initialValues={{ isActive: true }}
      >
        <Form.Item
          label="Title"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Subject"
          name={"subjectId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...subjectSelectProps}
            placeholder="Select Subject"
            filterOption={true}
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item
          label="Paper Year"
          name={["year"]}
          rules={[
            {
              required: true,
            },
            {
              validator: (_, value) => {
                const currentYear = new Date().getFullYear();
                const enteredYear = parseInt(value, 10);

                if (
                  isNaN(enteredYear) ||
                  enteredYear < 1900 ||
                  enteredYear >= currentYear
                ) {
                  return Promise.reject(
                    "Please enter a valid year that is less than the current year"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Editor label="Description" name={["description"]} />

        <Form.Item label="File">
          <Form.Item
            name="url"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
          >
            <Upload.Dragger
              accept={".pdf,.docx"}
              name="file"
              action={`${apiUrl}/past-papers/file`}
              headers={{
                ...Utils.getAuthorizationHeader(),
              }}
              listType="picture-card"
              onChange={onChange}
              maxCount={1}
              onRemove={(file) => {
                onRemove(file, "past-papers/file/remove");
              }}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item
          valuePropName="checked"
          name={["isActive"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>Is Active</Checkbox>
        </Form.Item>
      </Form>
    </Create>
  );
};
