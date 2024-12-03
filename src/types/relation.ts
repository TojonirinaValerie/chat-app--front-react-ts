import { IUser } from "./user";

export type RelationStatusType = "pending" | "accepted" | "rejected";

export interface IRelation {
  _id: string;
  sender: IUser;
  receiver: IUser;
  date: Date;
  status: RelationStatusType;
}

export interface IFriendRelation {
  _id: string;
  friend: IUser;
  date: Date;
  status: RelationStatusType;
}
