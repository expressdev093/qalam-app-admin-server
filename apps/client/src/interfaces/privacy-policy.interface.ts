import { IBase } from "./base.interface";

export interface IPrivacyPolicy extends IBase {
  description: string;
  isActive: boolean;
}
