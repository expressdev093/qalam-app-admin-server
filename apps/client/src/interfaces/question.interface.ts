import { IBase } from "./base.interface";
import { QuestionType } from "./enum";
import { IExercise } from "./exercise.interface";

export interface IQuestion extends IBase {
  text: string;

  answer: string;

  type: QuestionType;

  exerciseId: number;

  exercise: IExercise;
}
