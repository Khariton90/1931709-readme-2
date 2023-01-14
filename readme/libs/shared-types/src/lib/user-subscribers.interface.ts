import { User } from "./user.interface";

export interface UserSubscribers {
  _id?: string;
  email: string;
  subscribers: User[];
}