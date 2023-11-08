import { CrudFilter, useList } from "@refinedev/core";
import { IMcqOption } from "../../../interfaces";
import { useState, useEffect } from "react";

export const useMcqOptionList = (filters?: CrudFilter[]) => {
  const [mcqOptions, setMcqOptions] = useState<IMcqOption[]>([]);
  const { data, ...rest } = useList<IMcqOption>({
    resource: "mcq-options",
    pagination: {
      mode: "off",
    },
    filters: filters,
  });

  const mcqOptionData = data?.data;

  useEffect(() => {
    if (mcqOptionData) {
      setMcqOptions(mcqOptionData);
    }
  }, [mcqOptionData]);

  return {
    data,
    mcqOptions,
    setMcqOptions,
    ...rest,
  };
};
