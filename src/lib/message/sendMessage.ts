import { useEffect, useRef, useState } from "react";
import { IUser } from "../../types/user";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { sendMessage } from "../../api/message";
import { addMessage } from "../../redux/slice/message.slice";
import { toast } from "react-toastify";
import socket from "../../context/socket";
import { setLoadingSendMessage } from "../../redux/slice/loading.slice";

const useSendMessage = (indexOtheruser: null | number, otherUser?: IUser) => {
  const [content, setContent] = useState<string>("");
  const appDispatch = useAppDispatch();
  const [isTyping, setIsTyping] = useState(false);
  const userInfo = useAppSelector((state) => state.user);
  const typingTimeoutRef = useRef<number | null>(null);
  const loadingSendMessage = useAppSelector(state => state.loading.loadingSendMessage)

  const handleSendMessage = async () => {
    if (content !== "" && !loadingSendMessage) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      setIsTyping(false);
      if (otherUser) {
        appDispatch(setLoadingSendMessage(true));
        try {
          const response = await sendMessage(content.trim(), otherUser._id);

          appDispatch(
            addMessage({
              index: indexOtheruser,
              message: response.data.data,
              otherUser,
            })
          );
          setContent("");
        } catch (e) {
          console.log(e);
          toast.error("Impossible d'envoyer le message'");
        } finally {
          appDispatch(setLoadingSendMessage(false))
          
        }
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (content !== "") handleSendMessage();
    }
  };

  useEffect(() => {
    if (otherUser) {
      // Envoie le socket en train d'ecrire
      socket.emit("typing", {
        sender: userInfo._id,
        receiver: otherUser?._id,
        isTyping,
      });
    }
  }, [isTyping]);

  useEffect(() => {}, [content]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    setIsTyping(true);
    // supprimer le timeout lorsque l'utilisateur type a nouveau
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    // Mettre is typing false apres 2seconde
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };
  return {
    handleSendMessage,
    content,
    handleInputChange,
    handleKeyDown,
    setContent,
  };
};

export default useSendMessage;
