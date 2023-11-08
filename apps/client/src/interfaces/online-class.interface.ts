import { IBase } from "./base.interface";
import { IChapter } from "./chapter.interface";
import { ISubject } from "./subject.interface";
import { ITopic } from "./topic.interface";

export interface IOnlineClass extends IBase {
  title: string;
  description: string;
  startDate: string;
  endDate: Date;
  isEnded?: boolean;
  isActive: boolean;
  topicId: number;
  chapterId: number;
  subjectId: number;

  topic?: ITopic;
  chapter?: IChapter;
  subject?: ISubject;
}
