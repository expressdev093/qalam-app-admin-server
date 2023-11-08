import { CrudFilter, useList } from "@refinedev/core";
import { ITopicVideo } from "../../../interfaces";
import { useState, useEffect } from "react";

export const useTopicVideoList = (filters?: CrudFilter[], options?: any) => {
  const [videos, setVideos] = useState<ITopicVideo[]>([]);
  const { data, ...rest } = useList<ITopicVideo>({
    resource: "topic-videos",
    ...options,
    filters: filters,
  });

  const topicVideoData = data?.data;

  useEffect(() => {
    if (topicVideoData) {
      setVideos(topicVideoData);
    }
  }, [topicVideoData]);

  return {
    data,
    videos,
    setVideos,
    ...rest,
  };
};
