import { CrudFilter, useList } from "@refinedev/core";
import { ITopic } from "../../../interfaces";
import { useState, useEffect } from "react";

export const useTopicList = (filters?: CrudFilter[]) => {
  const [topics, setTopics] = useState<ITopic[]>([]);
  const { data, ...rest } = useList<ITopic>({
    resource: "topics",
    pagination: {
      mode: "off",
    },
    filters: filters,
  });

  const topicData = data?.data;

  useEffect(() => {
    if (topicData) {
      setTopics(topicData);
    }
  }, [topicData]);

  return {
    data,
    topics,
    setTopics,
    ...rest,
  };
};
