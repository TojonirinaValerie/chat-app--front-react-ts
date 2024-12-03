import { useEffect, useState } from "react";
import { IMessage } from "../../types/message";
import { useAppSelector } from "../../redux/store";

interface useScrollToBottomParams {
  conversations: IMessage[];
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  scrollAreaRef: React.MutableRefObject<HTMLDivElement | null>;
  indexOtherUser: number | null;
}
const useScrollToBottom = ({
  conversations,
  scrollRef,
  scrollAreaRef,
  indexOtherUser,
}: useScrollToBottomParams) => {
  const [conversationLength, setConversationLength] = useState(0);
  const discussions = useAppSelector((state) => state.message);
  useEffect(() => {
    if (scrollAreaRef.current) {
      if (
        conversationLength == 0 ||
        (conversations.length - 3 < conversationLength && scrollAreaRef.current.scrollTop > 0)
      ) {
        const scrollHeight = scrollAreaRef.current.scrollHeight;
        scrollAreaRef.current.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      }
      setConversationLength(conversations.length);
    }
  }, [
    conversations,
    scrollRef,
    indexOtherUser !== null && discussions[indexOtherUser].isOtherUserOnTyping,
  ]);
};

export default useScrollToBottom;
