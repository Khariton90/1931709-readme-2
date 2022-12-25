export interface User {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  passwordHash: string;
  avatar: string;
  dateRegister: Date;
  subscribers: number;
  posts: number;
}