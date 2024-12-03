import { IRelation } from "./relation";
import { IUser } from "./user";

export interface INotification {
  _id: string;
  type: "friend-request" | "friend-accept" | "friend-reject";
  receiver: string;
  relationId?: string;
  date: Date;
  seen: boolean;
  opened: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationDataType {
  otherUser: IUser;
  relation: IRelation;
  notification: INotification;
}

export interface NotificationCounts {
  "friend-request": number;
  "friend-accept": number;
  "friend-reject": number;
}
