import { IBase } from "./base.interface";
import { IChapter } from "./chapter.interface";
import { IMcq } from "./mcq.interface";
import { IQuestion } from "./question.interface";

export interface IExercise extends IBase {
  id: number;

  title: string;

  description: string;

  isActive: boolean;

  chapterId: number;

  chapter: IChapter;

  questions?: IQuestion[];

  mcqs?: IMcq[];

  mcqsUrl: string;

  questionsUrl: string;
}
