import { IUser } from "./user";

export interface IMessage {
  _id: string;
  content: string;
  sender: string;
  receiver: string;
  seen: boolean;
  date: Date;
}

export interface IDiscussions {
  lastMessage: IMessage;
  unreadMessage: number;
  otherUser: IUser;
  allConversation: IMessage[];
  totalMessage: number;
  isOtherUserOnTyping?: boolean;
  detail?: any
}
