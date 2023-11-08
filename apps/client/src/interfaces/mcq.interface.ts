import { IBase } from "./base.interface";
import { IExercise } from "./exercise.interface";
import { IMcqOption } from "./mcq-option.interface";

export interface IMcq extends IBase {
  text: string;

  exerciseId: number;

  exercise?: IExercise;

  options?: IMcqOption[];
}
