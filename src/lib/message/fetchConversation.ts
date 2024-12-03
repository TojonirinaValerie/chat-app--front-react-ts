import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { setLoadingDiscussions } from "../../redux/slice/loading.slice";
import { toast } from "react-toastify";
import { getConversations } from "../../api/message";
import { setConversation } from "../../redux/slice/message.slice";
import { messageConstant } from "../../utils/constant";

interface useFetchConversationParams {
  indexOtherUser: number | null;
}
const useFetchConversation = ({
  indexOtherUser,
}: useFetchConversationParams) => {
  const { id } = useParams();
  const appDispatch = useAppDispatch();
  const discussions = useAppSelector((state) => state.message);

  const fetchConversations = async (iduser: string, index: number) => {
    if (discussions[index].allConversation.length === 0) {
      appDispatch(setLoadingDiscussions(true));
      try {
        const response = await getConversations(
          iduser,
          0,
          messageConstant.firstLoadMessagesLimit
        );
        appDispatch(
          setConversation({
            index,
            allConversation: response.data.data.conversations,
            totalMessage: response.data.data.totalMessages,
          })
        );
      } catch (e) {
        toast.error("Impossible de charger votre message");
        console.log(e);
      } finally {
        appDispatch(setLoadingDiscussions(false));
      }
    }
  };

  useEffect(() => {
    if (id && indexOtherUser !== null) {
      fetchConversations(id, indexOtherUser);
    }
  }, [id, indexOtherUser]);
};

export default useFetchConversation;
