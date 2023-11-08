import { IBase } from "./base.interface";
import { LoginProvider } from "./enum/login-provider.enum";
import { Role } from "./enum/role.enum";

export interface IUser extends IBase {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  role: Role;

  provider: LoginProvider;

  googleId: string;

  facebookId: string;

  appleId: string;

  avatar?: string;

  isVerified: boolean;

  isActive: boolean;

  boardClassId?: number;

  boardId?: number;
}
