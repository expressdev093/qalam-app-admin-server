import { CrudFilter, useList } from "@refinedev/core";
import { IQuestion } from "../../../interfaces";
import React, { useState, useEffect } from "react";

export const useQuestionList = (filters?: CrudFilter[]) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const { data, ...rest } = useList<IQuestion>({
    resource: "questions",
    pagination: {
      mode: "off",
    },
    filters: filters,
  });

  const questionData = data?.data;

  useEffect(() => {
    if (questionData) {
      setQuestions(questionData);
    }
  }, [questionData]);

  return {
    data,
    questions,
    setQuestions,
    ...rest,
  };
};
