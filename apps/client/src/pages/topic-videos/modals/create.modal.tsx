import { useApiUrl } from "@refinedev/core";
import {
  Form,
  FormProps,
  Input,
  Modal,
  ModalProps,
  Upload,
  Checkbox,
  UploadFile,
} from "antd";
import { useFileUpload } from "../../../common/hooks";
import { normalizeFile, Utils } from "../../../common/utils";
import { ITopicVideo } from "../../../interfaces";
import React, { useEffect } from "react";

interface IProps {
  createModalProps: ModalProps;
  createFormProps: FormProps<ITopicVideo>;
  topicId?: number;
}

export const TopicVideoCreateModal: React.FC<IProps> = ({
  createFormProps,
  createModalProps,
  topicId,
}) => {
  const apiUrl = useApiUrl();

  const thumbnailUpload = useFileUpload();
  const videoUpload = useFileUpload();

  const onSubmitFinish = async ({ thumbnail, url, ...rest }: any) => {
    const newThumbnail =
      (thumbnail ?? []).length > 0 ? thumbnail[0] : undefined;
    const newUrl = (url ?? []).length > 0 ? url[0] : undefined;
    const newValues: ITopicVideo = {
      ...rest,
      topicId: topicId,
      thumbnail: newThumbnail?.name ?? null,
      url: newUrl?.name ?? null,
    };
    console.log(newValues);
    const response = await createFormProps?.onFinish?.(newValues);
  };

  const initialValues = createFormProps.initialValues
    ? {
        ...createFormProps.initialValues,
        thumbnail: Utils.getFileList(createFormProps.initialValues.thumbnail),
        url: Utils.getFileList(createFormProps.initialValues.url),
      }
    : { isActive: true };

  const onRemoveThumbnailFile = async (file: UploadFile<any>) => {
    const response = await thumbnailUpload.onRemove(
      file,
      "topic-videos/thumbnail/remove"
    );
    if (response?.data) {
      createFormProps?.form?.setFieldValue("thumbnail", []);
    }
  };

  const onRemoveVideoFile = async (file: UploadFile<any>) => {
    const response = await videoUpload.onRemove(
      file,
      "topic-videos/video/remove"
    );
    if (response?.data) {
      createFormProps?.form?.setFieldValue("url", []);
    }
  };

  return (
    <Modal {...createModalProps}>
      <Form
        {...createFormProps}
        layout="vertical"
        onFinish={onSubmitFinish}
        initialValues={initialValues}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Video title is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Thumbnail">
          <Form.Item
            name="thumbnail"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
            rules={[
              {
                required: true,
                message:
                  "Topic vidoe thumbnail is required please upload a video thumbnail",
              },
            ]}
          >
            <Upload.Dragger
              accept={thumbnailUpload.acceptImages}
              name="file"
              action={`${apiUrl}/topic-videos/thumbnail`}
              headers={{
                ...Utils.getAuthorizationHeader(),
              }}
              listType="picture-card"
              onChange={thumbnailUpload.onChange}
              maxCount={1}
              onRemove={onRemoveThumbnailFile}
            >
              <p className="ant-upload-text">
                Drag & drop a thumbnail in this area
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Video">
          <Form.Item
            name="url"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
            rules={[
              {
                required: true,
                message: "Topic vidoe is required please upload a video",
              },
            ]}
          >
            <Upload.Dragger
              accept={videoUpload.acceptVideos}
              name="file"
              action={`${apiUrl}/topic-videos/video`}
              headers={{
                ...Utils.getAuthorizationHeader(),
              }}
              listType="picture-card"
              onChange={videoUpload.onChange}
              maxCount={1}
              onRemove={onRemoveVideoFile}
            >
              <p className="ant-upload-text">
                Drag & drop a video in this area
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Is Active"
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
    </Modal>
  );
};
