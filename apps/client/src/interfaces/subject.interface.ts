import { IBase } from "./base.interface";
import { IChapter } from "./chapter.interface";
import { IOnlineClass } from "./online-class.interface";
import { IPastPaper } from "./past-papers.interface";
import { ITopic } from "./topic.interface";

export interface ISubject extends IBase {
  name: string;

  description?: string;

  isActive: boolean;

  image?: string;

  icon?: string;
  color?: string;

  chapters?: IChapter[];

  onlineClasses?: IOnlineClass[];

  topics?: ITopic[];

  papers?: IPastPaper[];
}
