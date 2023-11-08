import { useFileUploadState } from "@refinedev/antd";
import { useApiUrl } from "@refinedev/core";
import { UploadFile } from "antd";
import axiosInstance from "../../common/axios";
import { Utils } from "../../common/utils";
import React from "react";

export const useFileUpload = () => {
  const apiUrl = useApiUrl();
  const fileUpload = useFileUploadState();
  const onRemove = async (file: UploadFile<any>, url: string) => {
    try {
      const response = await axiosInstance.put(
        `${apiUrl}/${url}`,
        {
          path: file.name,
        },
        {
          headers: {
            ...Utils.getAuthorizationHeader(),
          },
        }
      );

      return response;
    } catch (err) {
      return undefined;
    }
  };
  return {
    ...fileUpload,
    onRemove,
    acceptImages: ".png,.jpg,.jpeg",
    acceptVideos: ".mp4",
  };
};
