import { Loader, ScrollArea } from "@mantine/core";
import MessageItem from "./messageItem";
import { useRef, useState } from "react";
import useFetchConversation from "../../lib/message/fetchConversation";
import { IUser } from "../../types/user";
import { IMessage } from "../../types/message";
import MessageInput from "./messageInput";
import ConversationHeader from "./conversationHeader";
import useFindOtherUser from "../../lib/message/findOtherUser";
import useMessageSeen from "../../lib/message/markAsSeen";
import { useAppSelector } from "../../redux/store";
import useSetConversation from "../../lib/message/setConversations";
import useLoadMoreMessage from "../../lib/message/loadMoreMessage";
import useScrollToBottom from "../../lib/message/scrollToBottom";
import { messageConstant } from "../../utils/constant";

const ConversationContainer = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const [otherUser, setOtherUser] = useState<IUser>();
  const [indexOtherUser, setIndexOtherUser] = useState<number | null>(null);
  const [conversations, setConversations] = useState<IMessage[]>([]);
  const discussions = useAppSelector((state) => state.message);
  const firstRef = useRef<HTMLDivElement | null>(null);

  useFindOtherUser({ setOtherUser, setIndexOtherUser });
  useFetchConversation({
    indexOtherUser,
  });
  useSetConversation(setConversations);
  useMessageSeen(indexOtherUser, scrollRef, conversations);
  const { onSrollPostionChange, isLoadingRefetch } = useLoadMoreMessage({
    firstRef,
    scrollAreaRef,
    indexOtherUser
  });

  useScrollToBottom({
    indexOtherUser,
    conversations,
    scrollRef,
    scrollAreaRef,
  });

  return (
    <div className="flex flex-col justify-between w-full h-full pl-4 max-sm:pb-16">
      <ConversationHeader otherUser={otherUser} />
      <ScrollArea
        viewportRef={scrollAreaRef}
        onScrollPositionChange={onSrollPostionChange}
        scrollbars="y"
        className="w-full flex h-full mt-4 pr-6"
        classNames={{
          scrollbar: "bg-blue-bg hover:bg-blue-bg text-blue-ligth",
        }}
      >
        <>
          <div className="w-full flex flex-row items-center justify-center">
            {isLoadingRefetch && <Loader className="py-4" />}
          </div>
          {conversations.map((discussion, index) => (
            <MessageItem
              key={`${index}-${discussion._id}`}
              sender={discussion.sender}
              content={discussion.content}
              otherUser={otherUser}
              divRef={
                index === messageConstant.moreLoadMessagesLimit - 1
                  ? firstRef
                  : undefined
              }
            />
          ))}
          {indexOtherUser !== null &&
            discussions[indexOtherUser].isOtherUserOnTyping && (
              <p
                className={`text-grey flex flex-row my-2 items-center overflow-hidden transition-all`}
              >
                <span className="mr-2">En train d'écrire</span>
                <Loader type="dots" color="#a9aeba" />
              </p>
            )}
          {indexOtherUser !== null && <div ref={scrollRef} className=""></div>}
        </>
      </ScrollArea>
      <MessageInput otherUser={otherUser} indexOtherUser={indexOtherUser} />
    </div>
  );
};

export default ConversationContainer;
