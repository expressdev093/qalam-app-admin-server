import { IBase } from "./base.interface";
import { ITopic } from "./topic.interface";

export interface ITopicVideo extends IBase {
   
  title: string;

  description?: string;

  url: string;

  thumbnail: string,

 
  topicId: number;

  views: number;

  isActive: boolean;

  
  topic: ITopic;
}