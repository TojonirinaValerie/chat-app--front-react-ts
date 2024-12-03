import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDiscussions, IMessage } from "../../types/message";
import { IUser } from "../../types/user";

const MessageSlice = createSlice({
  name: "message",
  initialState: [] as IDiscussions[],
  reducers: {
    setListDiscussion: (state, action: PayloadAction<IDiscussions[]>) => {
      state = action.payload;
      return state;
    },
    // Methode pour initialiser les conversations
    setConversation: (
      state,
      action: PayloadAction<{
        index: number;
        allConversation: IMessage[];
        totalMessage: number;
      }>
    ) => {
      const { index, allConversation, totalMessage } = action.payload;
      state[index].allConversation = allConversation.reverse();
      state[index].totalMessage = totalMessage;
      return state;
    },
    // Methode pour "charger plus de message"
    addConversation: (
      state,
      action: PayloadAction<{
        index: number;
        allConversation: IMessage[];
        totalMessage: number;
      }>
    ) => {
      const { index, allConversation, totalMessage } = action.payload;
      const moreConversation = allConversation.reverse();
      const newConversations = moreConversation.concat(
        state[index].allConversation
      );
      state[index].allConversation = newConversations;
      state[index].totalMessage = totalMessage;
      return state;
    },
    addMessage: (
      state,
      action: PayloadAction<{
        index: number | null;
        message: IMessage;
        otherUser: IUser;
        unreadMessage?: number;
      }>
    ) => {
      const { index, message, otherUser, unreadMessage } = action.payload;
      if (index !== null) {
        const discussion: IDiscussions = state.splice(index, 1)[0];
        discussion.allConversation.push(message);
        discussion.lastMessage = message;
        if (unreadMessage) {
          discussion.unreadMessage++;
        }
        state.unshift(discussion);
      } else {
        const discussion: IDiscussions = {
          allConversation: [message],
          lastMessage: message,
          unreadMessage: unreadMessage || 0,
          otherUser,
          totalMessage: 1,
        };
        state.unshift(discussion);
      }
      return state;
    },

    updateSeen: (state, action: PayloadAction<number>) => {
      state[action.payload].unreadMessage = 0;
      return state;
    },
    setOnTyping: (
      state,
      action: PayloadAction<{ idUser: string; value: boolean }>
    ) => {
      const { idUser, value } = action.payload;
      const index = state.findIndex(
        (discussion) => discussion.otherUser._id === idUser
      );
      if (index !== -1) {
        state[index].isOtherUserOnTyping = value;
      }
      return state;
    },
  },
});

export const {
  setListDiscussion,
  setConversation,
  addMessage,
  updateSeen,
  setOnTyping,
  addConversation,
} = MessageSlice.actions;
export const messageReducer = MessageSlice.reducer;
