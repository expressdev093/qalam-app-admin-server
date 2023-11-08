import { IBase } from "./base.interface";
import { IChapter } from "./chapter.interface";
import { IOnlineClass } from "./online-class.interface";
import { ISubject } from "./subject.interface";
import { ITopicVideo } from "./topic-video.interface";

export interface ITopic extends IBase {
  name: string;

  description?: string;

  image?: string;

  chapterId: number;

  isActive: boolean;

  chapter?: IChapter;

  videos: ITopicVideo[];

  onlineClasses?: IOnlineClass[];

  subject?: ISubject;

  subjectId: number
}
