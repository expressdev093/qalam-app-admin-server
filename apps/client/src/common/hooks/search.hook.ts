import { GetListResponse, useList } from "@refinedev/core";
import { IChapter, IOptions, ISubject, ITopic } from "../../interfaces";
import { useEffect, useState } from "react";

interface IProps {
  renderItem: (title: string, resource: string, id: number) => any;
  renderTitle: (title: string) => JSX.Element;
}

export const useSearch = ({ renderItem, renderTitle }: IProps) => {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<IOptions[]>([]);
  const { refetch: refetchSubjects } = useList<ISubject>({
    resource: "subjects",
    pagination: {
      mode: "off",
    },
    config: {
      filters: [{ field: "name", operator: "contains", value }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => onSuccess(data, "subjects"),
    },
  });

  const { refetch: refetchChapters } = useList<IChapter>({
    resource: "chapters",
    pagination: {
      mode: "off",
    },
    config: {
      filters: [{ field: "name", operator: "contains", value }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => onSuccess(data, "chapters"),
    },
  });

  const { refetch: refetchTopics } = useList<ITopic>({
    resource: "topics",
    pagination: {
      mode: "off",
    },
    config: {
      filters: [{ field: "name", operator: "contains", value }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => onSuccess(data, "topics"),
    },
  });

  const onSuccess = (data: GetListResponse<any>, resource: string) => {
    const dataOptionGroup = data?.data.map((item) =>
      renderItem(item.name, resource, item.id)
    );
    if (dataOptionGroup.length > 0) {
      setOptions((prevOptions) => [
        ...prevOptions,
        {
          label: renderTitle(capitalizeString(resource)),
          options: dataOptionGroup,
        },
      ]);
    }
  };

  const capitalizeString = (str: string) =>
    str.replace(/^\w/, (c) => c.toUpperCase());

  useEffect(() => {
    setOptions([]);
    refetchSubjects();
    refetchChapters();
    refetchTopics();
  }, [value]);

  return { options, setValue };
};
