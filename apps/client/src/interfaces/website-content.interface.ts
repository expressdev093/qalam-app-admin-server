import { IBase } from "./base.interface";
import { WebsiteContentType } from "./enum";

export interface IWebsiteContent extends IBase {
  title: string;
  description: string;
  type: WebsiteContentType;
  isActive: boolean;
}
