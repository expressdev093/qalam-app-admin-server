import { IBase } from "./base.interface";
import { ISubject } from "./subject.interface";

export interface IPastPaper extends IBase {
  name: string;

  description: string;

  url: string;

  subjectId: number;

  isActive: boolean;

  subject?: ISubject;

  year: number;
}
