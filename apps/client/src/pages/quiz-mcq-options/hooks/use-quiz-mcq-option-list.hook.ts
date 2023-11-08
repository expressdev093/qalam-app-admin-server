import { CrudFilter, useList } from "@refinedev/core";
import { IQuizMcqOption } from "../../../interfaces";
import { useState, useEffect } from "react";

export const useQuizMcqOptionList = (filters?: CrudFilter[]) => {
  const [quizMcqOptions, setQuizMcqOptions] = useState<IQuizMcqOption[]>([]);
  const { data, ...rest } = useList<IQuizMcqOption>({
    resource: "quiz-mcqoptions",
    pagination: {
      mode: "off",
    },
    filters: filters,
  });

  const mcqOptionData = data?.data;

  useEffect(() => {
    if (mcqOptionData) {
      setQuizMcqOptions(mcqOptionData);
    }
  }, [mcqOptionData]);

  return {
    data,
    quizMcqOptions,
    setQuizMcqOptions,
    ...rest,
  };
};
