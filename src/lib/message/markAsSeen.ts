import { useEffect } from "react";
import { markAsSeen } from "../../api/message";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { updateSeen } from "../../redux/slice/message.slice";
import { IMessage } from "../../types/message";

const useMessageSeen = (
  indexOtherUser: number | null,
  elementRef: React.MutableRefObject<any>,
  conversation: IMessage[]
) => {
  const { id } = useParams();
  const appDispatch = useAppDispatch();

  const callMarkAsSeen = async () => {
    if (id && indexOtherUser !== null) {
      try {
        await markAsSeen(id);
        appDispatch(updateSeen(indexOtherUser));
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        callMarkAsSeen();
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [conversation]);
};

export default useMessageSeen;
