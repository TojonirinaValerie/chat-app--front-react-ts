import { IRelation } from "./relation";

type UserRole = "regular_user" | "admin";
type Status = "pending" | "rejected" | "deleted" | "active";

export interface IUser {
  _id: string;
  pseudo: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: Status;
  profilPicture: string;
  createdAt?: Date;
  updatedAt?: Date;
  relations?: IRelation[];
}
