import { CrudFilter, HttpError, useList } from "@refinedev/core";
import { IExercise } from "../../../interfaces";
import { useEffect, useState } from "react";

export const useExerciseList = (filters?: CrudFilter[] | undefined) => {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const { data, ...rest } = useList<IExercise, HttpError>({
    resource: "exercises",
    pagination: {
      mode: "off",
    },
    filters,
  });

  const exercisesData = data?.data;

  useEffect(() => {
    if (exercisesData) {
      setExercises(exercisesData);
    }
  }, [exercisesData]);

  return {
    data,
    exercises,
    setExercises,
    ...rest,
  };
};
