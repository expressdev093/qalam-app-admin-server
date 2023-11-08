import { IBase } from "./base.interface";
import { IExercise } from "./exercise.interface";
import { IOnlineClass } from "./online-class.interface";
import { ISubject } from "./subject.interface";
import { ITopic } from "./topic.interface";

export interface IChapter extends IBase {
  name: string;

  description?: string;

  image?: string;

  subjectId: number;

  isActive: boolean;

  subject: ISubject;

  topics: ITopic[];

  exercises: IExercise[];

  onlineClasses: IOnlineClass[];
}
