import { IBase } from "./base.interface";
import { QuizType } from "./enum";
import { IQuizMcq } from "./quiz-mcq.interface";

export interface IQuiz extends IBase {
  title: string;

  description?: string;

  passingScore: number;

  mcqs: IQuizMcq[];

  type: QuizType;

  entityId?: number;

  isActive: boolean;

  totalTime: number;
}
