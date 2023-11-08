import { CrudFilter, useList } from "@refinedev/core";
import { IChapter, ISubject } from "../../../interfaces";

export const useSubjectList = (filters?: CrudFilter[]) => {
  const { data, ...rest } = useList<ISubject>({
    resource: "subjects",
    pagination: {
      mode: "off",
    },
    filters,
  });

  return {
    data,
    subjects: data?.data ?? [],
    ...rest,
  };
};
