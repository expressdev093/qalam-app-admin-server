import { IBase } from "./base.interface";
import { IQuizMcq } from "./quiz-mcq.interface";

export interface IQuizMcqOption extends IBase {
  text: string;

  detailAnswer?: string | null;

  isCorrect: boolean;

  quizMcqId: number;

  mcq: IQuizMcq;
}
