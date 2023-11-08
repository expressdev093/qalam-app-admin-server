import { Create, useForm } from "@refinedev/antd";
import { CreateResponse, HttpError, useApiUrl } from "@refinedev/core";
import {
  Form,
  Input,
  Modal,
  ModalProps,
  Upload,
  Checkbox,
  UploadFile,
} from "antd";
import { useCrudSocketClient, useFileUpload } from "../../common/hooks";
import { normalizeFile, Utils } from "../../common/utils";
import Editor from "../../components/editor";
import { IAppCorner } from "../../interfaces";
import React from "react";

export const AppCornerCreate: React.FC = () => {
  const { sendCreateEvent } = useCrudSocketClient<IAppCorner>({
    resource: "app-corners",
  });
  const apiUrl = useApiUrl();
  const { form, formProps, saveButtonProps, onFinish } = useForm<
    IAppCorner,
    HttpError,
    IAppCorner
  >({
    redirect: false,
    onMutationSuccess(data, variables, context) {
      form.resetFields();
      sendCreateEvent(data.data);
    },
  });

  const thumbnailUpload = useFileUpload();
  const videoUpload = useFileUpload();
  const imageUpload = useFileUpload();

  const onSubmitFinish = async ({
    videoThumbnail,
    image,
    video,
    ...rest
  }: any) => {
    const newThumbnail =
      (videoThumbnail ?? []).length > 0 ? videoThumbnail[0] : undefined;

    const newVideo = (video ?? []).length > 0 ? video[0] : undefined;
    const newImage = (image ?? []).length > 0 ? image[0] : undefined;

    const newValues: IAppCorner = {
      ...rest,
      videoThumbnail: newThumbnail?.name ?? null,
      video: newVideo?.name ?? null,
      image: newImage?.name ?? null,
    };
    const response = await onFinish?.(newValues);
  };

  const onRemoveFile = async (
    file: UploadFile<any>,
    name: "videoThumbnail" | "video" | "image"
  ) => {
    const response = await thumbnailUpload.onRemove(
      file,
      "app-corners/file/remove"
    );
    if (response?.data) {
      form?.setFieldValue(name, []);
    }
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
          name="title"
          label="Title"
          rules={[{ required: true, message: "Video title is required" }]}
        >
          <Input />
        </Form.Item>
        <Editor label="Description" name={["description"]} />
        <Form.Item label="Image">
          <Form.Item
            name="image"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
          >
            <Upload.Dragger
              accept={imageUpload.acceptImages}
              name="file"
              action={`${apiUrl}/app-corners/image`}
              headers={{
                ...Utils.getAuthorizationHeader(),
              }}
              listType="picture-card"
              onChange={imageUpload.onChange}
              maxCount={1}
              onRemove={(file) => onRemoveFile(file, "image")}
            >
              <p className="ant-upload-text">
                Drag & drop a image in this area
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item label="Thumbnail">
          <Form.Item
            name="videoThumbnail"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
          >
            <Upload.Dragger
              accept={thumbnailUpload.acceptImages}
              name="file"
              action={`${apiUrl}/app-corners/thumbnail`}
              headers={{
                ...Utils.getAuthorizationHeader(),
              }}
              listType="picture-card"
              onChange={thumbnailUpload.onChange}
              maxCount={1}
              onRemove={(file) => onRemoveFile(file, "videoThumbnail")}
            >
              <p className="ant-upload-text">
                Drag & drop a thumbnail in this area
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Video">
          <Form.Item
            name="video"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
          >
            <Upload.Dragger
              accept={videoUpload.acceptVideos}
              name="file"
              action={`${apiUrl}/app-corners/video`}
              headers={{
                ...Utils.getAuthorizationHeader(),
              }}
              listType="picture-card"
              onChange={videoUpload.onChange}
              maxCount={1}
              onRemove={(file) => onRemoveFile(file, "video")}
            >
              <p className="ant-upload-text">
                Drag & drop a video in this area
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item valuePropName="checked" name={["isActive"]}>
          <Checkbox>Is Active</Checkbox>
        </Form.Item>
      </Form>
    </Create>
  );
};
