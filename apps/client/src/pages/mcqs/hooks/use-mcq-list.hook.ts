import { CrudFilter, useList } from "@refinedev/core";
import { IMcq } from "../../../interfaces";
import { useState, useEffect } from "react";

export const useMcqList = (filters?: CrudFilter[]) => {
  const [mcqs, setMcqs] = useState<IMcq[]>([]);
  const { data, ...rest } = useList<IMcq>({
    resource: "mcqs",
    pagination: {
      mode: "off",
    },
    filters: filters,
  });

  const mcqData = data?.data;

  useEffect(() => {
    if (mcqData) {
      setMcqs(mcqData);
    }
  }, [mcqData]);

  return {
    data,
    mcqs,
    setMcqs,
    ...rest,
  };
};
