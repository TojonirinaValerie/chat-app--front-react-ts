import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setLoadingDiscussions } from "../../redux/slice/loading.slice";
import { getConversations } from "../../api/message";
import { addConversation } from "../../redux/slice/message.slice";
import { toast } from "react-toastify";
import { messageConstant } from "../../utils/constant";
interface useLoadMoreMessageParams {
  indexOtherUser: number | null;
  firstRef: React.MutableRefObject<HTMLDivElement | null>;
  scrollAreaRef: React.MutableRefObject<HTMLDivElement | null>;
}
const useLoadMoreMessage = ({
  indexOtherUser,
  firstRef,
  scrollAreaRef,
}: useLoadMoreMessageParams) => {
  const { id } = useParams();
  const appDispatch = useAppDispatch();
  const conversations = useAppSelector((state) => state.message);
  const [isLoadingRefetch, setIsLoadingRefetch] = useState(false);

  const reFetchConversations = async (iduser: string, index: number) => {
    const skip = conversations[index].allConversation.length;
    appDispatch(setLoadingDiscussions(true));
    try {
      const response = await getConversations(
        iduser,
        skip,
        messageConstant.moreLoadMessagesLimit
      );
      const responseData = response.data.data;
      appDispatch(
        addConversation({
          index,
          allConversation: responseData.conversations,
          totalMessage: responseData.totalMessages,
        })
      );
    } catch (e) {
      toast.error("Impossible de charger votre message");
      console.log(e);
    } finally {
      appDispatch(setLoadingDiscussions(false));
    }
  };

  const handleReload = async () => {
    if (id && indexOtherUser !== null) {
      const conversation = conversations[indexOtherUser];
      if (conversation.totalMessage > messageConstant.firstLoadMessagesLimit) {
        if (conversation.totalMessage !== conversation.allConversation.length) {
          setIsLoadingRefetch(true);
          setTimeout(async () => {
            await reFetchConversations(id, indexOtherUser);
            if (firstRef.current && scrollAreaRef.current) {
              firstRef.current.scrollIntoView();
              const currentScrollTop = scrollAreaRef.current.scrollTop;
              scrollAreaRef.current?.scrollTo({ top: currentScrollTop - 10 });
            }

            setIsLoadingRefetch(false);
          }, 2000);
        }
      }
    }
  };

  // useEffect(() => {
  //   if (scrollAreaRef.current?.scrollTop === 0 && !isLoadingRefetch) {
  //     handleReload();
  //   }
  // }, [
  //   scrollAreaRef.current?.scrollTop.valueOf,
  //   isLoadingRefetch,
  //   id,
  //   indexOtherUser,
  //   // conversations,
  // ]);

  const onSrollPostionChange = (position: { x: number; y: number }) => {
    if (position.y === 0 && !isLoadingRefetch) {
      handleReload();
    }
  };

  return { onSrollPostionChange, isLoadingRefetch };
};

export default useLoadMoreMessage;
