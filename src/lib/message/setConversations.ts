import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { IMessage } from "../../types/message";
import { useParams } from "react-router-dom";

const useSetConversation = (
  setConversations: React.Dispatch<React.SetStateAction<IMessage[]>>
) => {
  const { id } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const discussions = useAppSelector((state) => state.message);

  useEffect(() => {
    setisLoading(true);
    const discussion = discussions.find((discussion) => {
      if (discussion.otherUser._id === id) {
        return discussion;
      }
    });
    if (discussion) {
      setConversations(discussion.allConversation);
    } else {
      setConversations([]);
    }
    setisLoading(false);
  }, [discussions, id]);

  return { isLoading };
};

export default useSetConversation;
