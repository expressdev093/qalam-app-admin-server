import {IUser} from './user.interface';

export interface ITokenUser {
  user: IUser;
  token: string;
}
