import { IBase } from "./base.interface";

export interface IAppCorner extends IBase {
  title: string;

  description: string;

  video?: string;

  image?: string;

  videoThumbnail?: string;

  isActive: boolean;
}
