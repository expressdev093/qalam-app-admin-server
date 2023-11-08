import { IBase } from "./base.interface";
import { IMcq } from "./mcq.interface";

export interface IMcqOption extends IBase {
  text: string;

  isCorrect: boolean;

  mcqId: number;

  mcq: IMcq;

  detailAnswer?: string | null;
}
