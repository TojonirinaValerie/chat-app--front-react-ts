import { useEffect, useState } from "react";
import { IDiscussions } from "../../types/message";
import { useAppSelector } from "../../redux/store";

const useGetUnreadMessageLength = () => {
  const discussions = useAppSelector((state) => state.message);
  const [unreadConversation, setUnreadConversation] = useState(0);

  const getUnreadMessageLength = (discussions: IDiscussions[]): number => {
    let unread: number = 0;
    discussions.forEach((discussion) => {
      if (discussion.unreadMessage > 0) unread++;
    });

    return unread;
  };

  useEffect(() => {
    setUnreadConversation(getUnreadMessageLength(discussions));
  }, [discussions]);

  return { unreadConversation };
};
export default useGetUnreadMessageLength;
