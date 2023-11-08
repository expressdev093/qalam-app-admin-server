import { CrudFilter, useList } from "@refinedev/core";
import { IQuizMcq } from "../../../interfaces";
import { useState, useEffect } from "react";

export const useQuizMcqList = (filters?: CrudFilter[], enabled?: boolean) => {
  const [quizMcqs, setQuizMcqs] = useState<IQuizMcq[]>([]);
  const { data, ...rest } = useList<IQuizMcq>({
    resource: "quiz-mcqs",
    pagination: {
      mode: "off",
    },
    queryOptions: {
      enabled,
    },
    filters: filters,
  });

  const mcqData = data?.data;

  useEffect(() => {
    if (mcqData) {
      setQuizMcqs(mcqData);
    }
  }, [mcqData]);

  return {
    data,
    quizMcqs,
    setQuizMcqs,
    ...rest,
  };
};
