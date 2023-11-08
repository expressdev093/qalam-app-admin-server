import { CrudFilter, useList } from "@refinedev/core";
import { IChapter } from "../../../interfaces";
import { useState, useEffect } from "react";

export const useChapterList = (filters?: CrudFilter[], enabled?: boolean) => {
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const { data, ...rest } = useList<IChapter>({
    resource: "chapters",
    pagination: {
      mode: "off",
    },
    filters,
    queryOptions: {
      enabled,
    },
  });

  const chatperData = data?.data;

  useEffect(() => {
    if (chatperData) {
      setChapters(chatperData);
    }
  }, [chatperData]);

  return {
    data,
    chapters,
    setChapters,
    ...rest,
  };
};
