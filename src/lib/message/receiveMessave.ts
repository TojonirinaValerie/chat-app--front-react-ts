import { useEffect } from "react";
import socket from "../../context/socket";
import { IMessage } from "../../types/message";
import { IUser } from "../../types/user";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addMessage } from "../../redux/slice/message.slice";
interface ReceiveMessageData {
  message: IMessage;
  otherUser: IUser;
}
interface UseReceiveMessageParams {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}
const useReceiveMessage = ({ audioRef }: UseReceiveMessageParams) => {
  const discussions = useAppSelector((state) => state.message);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    socket.on("receive-message", (data: ReceiveMessageData) => {
      const { message, otherUser } = data;

      const index = discussions.findIndex((discussion) => {
        return discussion.otherUser._id === otherUser._id;
      });

      if (index !== -1) {
        appDispatch(
          addMessage({ index, message, otherUser, unreadMessage: 1 })
        );
      } else {
        appDispatch(
          addMessage({ index: null, message, otherUser, unreadMessage: 1 })
        );
      }
      if (audioRef.current) {
        audioRef.current.play();
      }
    });

    return () => {
      socket.off("receive-message");
    };
  }, [discussions]);
};

export default useReceiveMessage;
