import {IGoogleUser} from './google-user';


export interface IUser extends IGoogleUser {
  contacts: string[];
}
